'use client';

import { useState } from 'react';
import { Tag, Btn } from '@/components/ui';
import { BreathOrb } from '@/components/BreathOrb';
import type { Level } from '@/lib/library';

const FLOWS: Record<Level, string[]> = {
  cantienica: [
    'Stopp.',
    'Knie weich. Vier Punkte unter den Füßen.',
    'Sitzbeinhöcker weit. Becken im Lot.',
    'Atme ein — vier.',
    'Halte — vier.',
    'Aus — sechs.',
    'Levator ani sanft. Zwerchfell senken.',
    'Hinterkopf hoch. Kiefer lösen.',
    'Ein Schritt. Nur einer.',
  ],
  beginner: [
    'Stopp.',
    'Stehe. Vier Punkte unter den Füßen.',
    'Atme ein — vier.',
    'Halte — vier.',
    'Atme aus — sechs.',
    'Schultern lösen.',
    'Kiefer lösen.',
    'Ein Schritt. Nur einer.',
  ],
};

export function Emergency({
  level,
  onComplete,
}: {
  level: Level;
  onComplete: () => void;
}) {
  const flow = FLOWS[level];
  const [i, setI] = useState(0);

  return (
    <div className="fixed inset-0 bg-bg-ink z-50 flex flex-col items-center justify-center px-6 text-center">
      <Tag color="ember">Reduktion</Tag>
      <div className="h-8" />
      <h1
        key={i}
        className="font-serif font-light leading-none text-ink max-w-[720px] animate-rise"
        style={{ fontSize: 'clamp(36px, 8vw, 72px)' }}
      >
        {flow[i]}
      </h1>
      <div className="h-14" />
      <BreathOrb size={160} phase={i % 2 ? 'in' : 'out'} />
      <div className="h-14" />
      {i < flow.length - 1 ? (
        <Btn kind="ember" onClick={() => setI(i + 1)}>Weiter</Btn>
      ) : (
        <Btn onClick={onComplete}>Zurück</Btn>
      )}
      <div className="h-3" />
      <span className="font-mono text-ink-mute text-[10px] tracking-[0.3em]">
        {i + 1} / {flow.length}
      </span>
    </div>
  );
}
