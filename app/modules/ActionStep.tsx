'use client';

import { useState } from 'react';
import { Stage, Tag, Display, Btn, Ghost } from '@/components/ui';
import { store } from '@/lib/store';

export function ActionStep({
  onComplete,
  onExit,
}: {
  onComplete: () => void;
  onExit: () => void;
}) {
  const [step, setStep] = useState('');
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Stage glowColor="accent">
        <Tag color="accent">Handlung</Tag>
        <div className="h-8" />
        <Display className="!text-[clamp(28px,4vw,40px)] !text-ink-dim">Jetzt:</Display>
        <div className="h-4" />
        <Display>{step || 'Stehe auf.'}</Display>
        <div className="h-12" />
        <Btn onClick={() => { store.record({ type: 'action' }); onComplete(); }}>
          Schließen
        </Btn>
      </Stage>
    );
  }

  return (
    <Stage glowColor="accent">
      <Tag color="accent">Handlung · Ein direkter Schritt</Tag>
      <div className="h-7" />
      <Display className="!text-[clamp(28px,4vw,40px)]">
        Welche eine Bewegung<br />ist jetzt real?
      </Display>
      <div className="h-4" />
      <p className="text-ink-dim text-[16px] max-w-[420px] mx-auto leading-[1.6]">
        Klein. Konkret. In zwei Minuten machbar.
      </p>
      <div className="h-7" />
      <input
        autoFocus
        value={step}
        onChange={e => setStep(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && step.trim()) setDone(true);
        }}
        placeholder="Aufstehen. Wasser holen. Anrufen."
        className="w-full max-w-[520px] bg-bg-raise text-ink border border-line focus:border-accent outline-none text-center font-display font-normal py-4 px-4 rounded-xl"
        style={{
          fontSize: 'clamp(20px, 3vw, 26px)',
        }}
      />
      <div className="h-10" />
      <Btn onClick={() => setDone(true)} disabled={!step.trim()}>
        Handeln
      </Btn>
      <div className="h-2" />
      <Ghost onClick={onExit}>Zurück</Ghost>
    </Stage>
  );
}
