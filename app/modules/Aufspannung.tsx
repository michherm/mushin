'use client';

import { useEffect, useState } from 'react';
import { Stage, Tag, Display, Btn, Ghost, BoneCue } from '@/components/ui';
import { BreathOrb } from '@/components/BreathOrb';
import { useSoundscape } from '@/lib/useSoundscape';
import type { Level } from '@/lib/library';

interface Station {
  tag: string;
  cue: string;
  hint: string;
  bone?: string;
  orbPhase: 'in' | 'hold' | 'out';
}

const STATIONS_CANTIENICA: Station[] = [
  { tag: '01', cue: 'Sitzbeinhöcker spüren.',         hint: 'Auf den höchsten Punkten ausrichten. Schambein und Steißbein im Lot.', bone: 'Sitzbeinhöcker', orbPhase: 'in' },
  { tag: '02', cue: 'Kronenpunkt zur Decke.',         hint: 'Vier Fingerbreit hinter dem höchsten Punkt. Wirbelsäule aufspannen.', bone: 'Kronenpunkt', orbPhase: 'hold' },
  { tag: '03', cue: 'Diagonal beatmen.',              hint: 'Linker Sitzbeinhöcker einatmen. Rechte Schulter ausatmen.', bone: 'Diagonale', orbPhase: 'out' },
  { tag: '04', cue: 'Gegengleich.',                   hint: 'Rechter Sitzbeinhöcker einatmen. Linke Schulter ausatmen.', bone: 'Diagonale', orbPhase: 'in' },
  { tag: '05', cue: 'In die Aufspannung entspannen.', hint: 'Aktiv. Levator ani sanft. Zungenenden an den Gaumen. Da bist du.', bone: 'Aufspannung', orbPhase: 'out' },
];

const STATIONS_BEGINNER: Station[] = [
  { tag: '01', cue: 'Sitz aufrichten.',         hint: 'Spür den Sitzknochen unter dir. Becken aufrecht.', orbPhase: 'in' },
  { tag: '02', cue: 'Hinterkopf zur Decke.',    hint: 'Wie an einem Faden. Wirbelsäule wird lang.', orbPhase: 'hold' },
  { tag: '03', cue: 'Atme tief.',               hint: 'Vier ein durch die Nase. Sechs aus durch den Mund.', orbPhase: 'out' },
  { tag: '04', cue: 'Schultern weich.',         hint: 'Lass sie hängen. Kiefer entspannen.', orbPhase: 'in' },
  { tag: '05', cue: 'Bleib einen Moment.',      hint: 'Spür den Raum, den du gerade aufgemacht hast.', orbPhase: 'out' },
];

const DURATION_MS = 18000;

export function Aufspannung({
  level,
  onComplete,
  onExit,
}: {
  level: Level;
  onComplete: () => void;
  onExit: () => void;
}) {
  useSoundscape('aufspannung');

  const stations = level === 'cantienica' ? STATIONS_CANTIENICA : STATIONS_BEGINNER;
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || i >= stations.length) return;
    const t = setTimeout(() => setI(prev => prev + 1), DURATION_MS);
    return () => clearTimeout(t);
  }, [i, started, stations.length]);

  if (!started) {
    return (
      <Stage glowColor="accent">
        <Tag color="accent">Aufspannung · 90 Sekunden</Tag>
        <div className="h-7" />
        <Display>Im Sitzen.<br /><span className="text-ink-dim">Überall machbar.</span></Display>
        <div className="h-6" />
        <p className="text-ink-dim text-[16px] leading-[1.6] max-w-[460px] mx-auto">
          Fünf kurze Stationen. Du sitzt, atmest diagonal,
          richtest dich auf. <BoneCue>Knochen denken.</BoneCue>
        </p>
        <div className="h-12" />
        <Btn onClick={() => setStarted(true)}>Setz dich aufrecht. Beginne.</Btn>
        <div className="h-2" />
        <Ghost onClick={onExit}>Zurück</Ghost>
      </Stage>
    );
  }

  if (i >= stations.length) {
    return (
      <Stage glowColor="accent">
        <Tag color="accent">Aufspannung</Tag>
        <div className="h-8" />
        <Display>Du bist aufgespannt.</Display>
        <div className="h-5" />
        <p className="text-ink-dim text-[17px] max-w-[460px] mx-auto">
          Mach das oft. Bushaltestelle, Kassenschlange, Schreibtisch.
        </p>
        <div className="h-12" />
        <Btn onClick={onComplete}>Weiter</Btn>
      </Stage>
    );
  }

  const s = stations[i];

  return (
    <Stage glowColor="accent">
      <Tag color="accent">Station {s.tag} · {stations.length}</Tag>
      <div className="h-3" />

      {s.bone && (
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade">
          <div className="w-1 h-1 rotate-45 bg-accent" />
          <BoneCue>{s.bone}</BoneCue>
          <div className="w-1 h-1 rotate-45 bg-accent" />
        </div>
      )}

      <Display>{s.cue}</Display>
      <div className="h-5" />
      <p className="text-ink-dim text-[17px] leading-[1.6] max-w-[480px] mx-auto animate-fade">
        {s.hint}
      </p>
      <div className="h-10" />
      <div className="flex justify-center">
        <BreathOrb size={170} phase={s.orbPhase} color="accent" />
      </div>
      <div className="h-12" />

      <div className="flex justify-center gap-1.5 mb-6">
        {stations.map((_, idx) => (
          <div
            key={idx}
            className="h-px rounded-full transition-all duration-500"
            style={{
              width: idx === i ? 24 : 12,
              background: idx < i ? '#D9BE85' : idx === i ? '#E8C470' : '#3A2F22',
              opacity: idx <= i ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        {i < stations.length - 1
          ? <Btn onClick={() => setI(i + 1)}>Weiter</Btn>
          : <Btn onClick={onComplete}>Schließen</Btn>}
      </div>
      <div className="h-2" />
      <Ghost onClick={onExit}>Abbrechen</Ghost>
    </Stage>
  );
}
