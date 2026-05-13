/**
 * SOUNDSCAPE — Klangbetten per Web Audio API
 *
 * Kein Audio-File. Keine Lizenz. Der Browser erzeugt die Töne selbst.
 *
 * Pro Modul ein anderes Klangbett:
 *   - stand       → tiefes warmes Brummen, "Boden"
 *   - aufspannung → heller Ton oben, der wartet — "Kronenpunkt"
 *   - breath      → sanftes Auf-Ab, geht mit dem Atem
 *   - flow        → leise Wassergeräusche aus weißem Rauschen
 *   - ground      → tiefer pulsierender Ton, Erdung
 *   - emergency   → warme Frequenz, Herzschlag-Tempo
 *   - sensei      → Stille (kein Klang)
 *
 * Eine zentrale Klasse, eine Instanz, sauber pausierbar.
 */

export type Soundscape =
  | 'stand'
  | 'aufspannung'
  | 'breath'
  | 'flow'
  | 'ground'
  | 'emergency'
  | 'silence';

interface Active {
  nodes: AudioNode[];
  gain: GainNode;
}

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private active: Active | null = null;
  private masterGain: GainNode | null = null;
  private enabled = true;

  private ensureCtx(): AudioContext {
    if (!this.ctx) {
      const Ctor = (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      this.ctx = new Ctor();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.08; // sehr leise, default
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    if (!on) this.stop();
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setVolume(v: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(0.2, v));
    }
  }

  play(scape: Soundscape) {
    if (!this.enabled || typeof window === 'undefined') return;
    if (scape === 'silence') { this.stop(); return; }

    this.stop();
    const ctx = this.ensureCtx();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 2); // sanftes Fade-In
    if (this.masterGain) gain.connect(this.masterGain);

    const nodes: AudioNode[] = [gain];

    switch (scape) {
      case 'stand':       this.buildStand(ctx, gain, nodes); break;
      case 'aufspannung': this.buildAufspannung(ctx, gain, nodes); break;
      case 'breath':      this.buildBreath(ctx, gain, nodes); break;
      case 'flow':        this.buildFlow(ctx, gain, nodes); break;
      case 'ground':      this.buildGround(ctx, gain, nodes); break;
      case 'emergency':   this.buildEmergency(ctx, gain, nodes); break;
    }

    this.active = { nodes, gain };
  }

  stop() {
    if (!this.active || !this.ctx) return;
    const { gain } = this.active;
    const t = this.ctx.currentTime;
    try {
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.linearRampToValueAtTime(0, t + 1.5); // Fade-Out
      setTimeout(() => {
        this.active?.nodes.forEach(n => {
          try { (n as OscillatorNode).stop?.(); } catch {/* ignore */}
          try { n.disconnect(); } catch {/* ignore */}
        });
        this.active = null;
      }, 1700);
    } catch {
      this.active = null;
    }
  }

  /* ────────────────────────────────────────────────────────────────
     Klangbetten — jedes Modul hat sein eigenes Profil
     ──────────────────────────────────────────────────────────────── */

  /** STAND — tiefes warmes Brummen wie der Boden */
  private buildStand(ctx: AudioContext, dest: GainNode, nodes: AudioNode[]) {
    // Tiefe Grundnote (E1 ≈ 41 Hz, sehr fundamental)
    const o1 = ctx.createOscillator();
    o1.frequency.value = 55;
    o1.type = 'sine';

    // Sanfte Oberschwingung
    const o2 = ctx.createOscillator();
    o2.frequency.value = 82.5; // perfekte Quinte
    o2.type = 'sine';

    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.25;

    // Sanftes LFO für lebendige Modulation
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05; // sehr langsam
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain).connect(g1.gain);

    o1.connect(g1).connect(dest);
    o2.connect(g2).connect(dest);
    o1.start(); o2.start(); lfo.start();
    nodes.push(o1, o2, g1, g2, lfo, lfoGain);
  }

  /** AUFSPANNUNG — heller Ton oben, der wartet (Kronenpunkt) */
  private buildAufspannung(ctx: AudioContext, dest: GainNode, nodes: AudioNode[]) {
    // Höhere, schwebende Töne
    const o1 = ctx.createOscillator();
    o1.frequency.value = 220; // A3
    o1.type = 'sine';

    const o2 = ctx.createOscillator();
    o2.frequency.value = 330; // E4 — perfekte Quinte
    o2.type = 'sine';

    const o3 = ctx.createOscillator();
    o3.frequency.value = 440; // A4 — Oktave
    o3.type = 'sine';

    const g1 = ctx.createGain(); g1.gain.value = 0.18;
    const g2 = ctx.createGain(); g2.gain.value = 0.10;
    const g3 = ctx.createGain(); g3.gain.value = 0.06;

    // Detuning für ein lebendiges Schweben
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.13;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 2;
    lfo.connect(lfoGain).connect(o1.frequency);

    o1.connect(g1).connect(dest);
    o2.connect(g2).connect(dest);
    o3.connect(g3).connect(dest);
    o1.start(); o2.start(); o3.start(); lfo.start();
    nodes.push(o1, o2, o3, g1, g2, g3, lfo, lfoGain);
  }

  /** BREATH — sanftes Auf-Ab, geht mit dem Atem */
  private buildBreath(ctx: AudioContext, dest: GainNode, nodes: AudioNode[]) {
    const o1 = ctx.createOscillator();
    o1.frequency.value = 110;
    o1.type = 'sine';

    const o2 = ctx.createOscillator();
    o2.frequency.value = 165;
    o2.type = 'sine';

    const g1 = ctx.createGain(); g1.gain.value = 0.35;
    const g2 = ctx.createGain(); g2.gain.value = 0.20;

    // LFO synchronisiert mit Atemzyklus (4 ein, 4 halten, 6 aus = 14s)
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 1 / 14; // ein Zyklus alle 14 Sekunden
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.3;
    lfo.connect(lfoGain).connect(g1.gain);

    o1.connect(g1).connect(dest);
    o2.connect(g2).connect(dest);
    o1.start(); o2.start(); lfo.start();
    nodes.push(o1, o2, g1, g2, lfo, lfoGain);
  }

  /** FLOW — sanftes Rauschen wie Wasser */
  private buildFlow(ctx: AudioContext, dest: GainNode, nodes: AudioNode[]) {
    // Pink-Noise via Buffer
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.96300 * b1 + white * 0.296830;
      b2 = 0.57000 * b2 + white * 1.0526913;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.11;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter — nimmt Schärfe weg
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.5;

    const g = ctx.createGain();
    g.gain.value = 0.25;

    // Langsame Wellen
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain).connect(g.gain);

    noise.connect(filter).connect(g).connect(dest);
    noise.start(); lfo.start();
    nodes.push(noise, filter, g, lfo, lfoGain);
  }

  /** GROUND — tiefer pulsierender Ton, Herzschlag-nah */
  private buildGround(ctx: AudioContext, dest: GainNode, nodes: AudioNode[]) {
    const o = ctx.createOscillator();
    o.frequency.value = 65;
    o.type = 'sine';

    const g = ctx.createGain();
    g.gain.value = 0.5;

    // Puls mit ~60 BPM
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 1;
    lfo.type = 'sine';
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.3;
    lfo.connect(lfoGain).connect(g.gain);

    o.connect(g).connect(dest);
    o.start(); lfo.start();
    nodes.push(o, g, lfo, lfoGain);
  }

  /** EMERGENCY — sehr leise, geerdet, langsam beruhigend */
  private buildEmergency(ctx: AudioContext, dest: GainNode, nodes: AudioNode[]) {
    const o1 = ctx.createOscillator();
    o1.frequency.value = 48;
    o1.type = 'sine';

    const o2 = ctx.createOscillator();
    o2.frequency.value = 72;
    o2.type = 'sine';

    const g1 = ctx.createGain(); g1.gain.value = 0.4;
    const g2 = ctx.createGain(); g2.gain.value = 0.15;

    // Sehr langsamer Puls — beruhigt das Nervensystem
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.1; // 6 BPM, beruhigend
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.2;
    lfo.connect(lfoGain).connect(g1.gain);

    o1.connect(g1).connect(dest);
    o2.connect(g2).connect(dest);
    o1.start(); o2.start(); lfo.start();
    nodes.push(o1, o2, g1, g2, lfo, lfoGain);
  }
}

/* Single Instance, lebt über alle Module hinweg */
let _engine: SoundscapeEngine | null = null;

export function getSoundscape(): SoundscapeEngine {
  if (typeof window === 'undefined') {
    // SSR-Stub
    return {
      play: () => {},
      stop: () => {},
      setEnabled: () => {},
      isEnabled: () => false,
      setVolume: () => {},
    } as unknown as SoundscapeEngine;
  }
  if (!_engine) _engine = new SoundscapeEngine();
  return _engine;
}
