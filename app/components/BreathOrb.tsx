/**
 * BreathOrb — Version 2: lebendiger, wärmer, mit Tiefe.
 *
 * Statt einem Ring jetzt:
 *   - äußerer fester Ring (Struktur)
 *   - mittlerer atmender Ring (Bewegung)
 *   - innerer Glow-Schein (warmes Herz)
 *   - zentraler Diamant (Kronenpunkt)
 *
 * Farbe wechselt sanft je nach Phase.
 */

'use client';

export type BreathPhase = 'in' | 'hold' | 'out' | 'idle';

export function BreathOrb({
  size = 220,
  phase = 'idle',
  label,
  color = 'accent',
}: {
  size?: number;
  phase?: BreathPhase;
  label?: string;
  color?: 'accent' | 'breath' | 'ember';
}) {
  const phaseClass = {
    in: 'orb-inhale',
    hold: 'orb-hold',
    out: 'orb-exhale',
    idle: 'orb-idle',
  }[phase];

  const tones = {
    accent: { ring: '#3A2F22', ringHi: '#5A4F3E', dot: '#D9BE85', glow: 'rgba(217, 190, 133, 0.18)' },
    breath: { ring: '#2A3A35', ringHi: '#4A5F58', dot: '#7DA89C', glow: 'rgba(125, 168, 156, 0.18)' },
    ember:  { ring: '#3A2218', ringHi: '#5A2F22', dot: '#C44A2E', glow: 'rgba(196, 74, 46, 0.20)' },
  }[color];

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      {/* Warmer Schein im Hintergrund */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at center, ${tones.glow} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          transform: phase === 'in' ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 4000ms cubic-bezier(.4,.1,.4,1)',
        }}
      />

      {/* Äußerer Ring — Struktur */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: `1px solid ${tones.ring}` }}
        aria-hidden
      />

      {/* Mittlerer Ring — atmet */}
      <div
        className={`absolute rounded-full ${phaseClass}`}
        style={{ inset: 22, border: `1px solid ${tones.ringHi}` }}
        aria-hidden
      />

      {/* Innerer Schein — Herz */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '40%',
          background: `radial-gradient(circle, ${tones.glow} 0%, transparent 60%)`,
          transform: phase === 'in' ? 'scale(1.3)' : phase === 'out' ? 'scale(0.7)' : 'scale(1)',
          transition: 'transform 5000ms cubic-bezier(.4,.1,.4,1)',
        }}
        aria-hidden
      />

      {/* Zentraler Punkt — Kronenpunkt */}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-1 -ml-0.5 -mt-0.5 rotate-45"
        style={{ background: tones.dot, boxShadow: `0 0 8px ${tones.dot}` }}
        aria-hidden
      />

      {/* Phasen-Label */}
      {label && (
        <div className="absolute -bottom-7 left-0 right-0 text-center font-mono text-[10px] tracking-[0.3em] uppercase animate-fade"
             style={{ color: '#9A8E78' }}>
          {label}
        </div>
      )}
    </div>
  );
}
