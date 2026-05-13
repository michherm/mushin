'use client';

import { useState } from 'react';
import { Tag, Btn } from '@/components/ui';
import { BreathOrb } from '@/components/BreathOrb';
import { useSoundscape } from '@/lib/useSoundscape';
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
  useSoundscape('emergency');

  const flow = FLOWS[level];
  const [i, setI] = useState(0);

  return (
    <div className="fixed inset-0 bg-bg-ink z-50 flex flex-col items-center justify-center px-5 py-12 text-center overflow-y-auto">
      {/* Warmer Glow auch hier — nicht kalt */}
      <div
        aria-hidden
        className="warm-glow pointer-events-none"
        style={{
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '80vw', height: '80vw', maxWidth: '600px', maxHeight: '600px',
          background: 'radial-gradient(circle, rgba(196, 74, 46, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 my-auto">
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
        <div className="flex justify-center">
          <BreathOrb size={160} phase={i % 2 ? 'in' : 'out'} color="ember" />
        </div>
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
    </div>
  );
}
