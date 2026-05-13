'use client';

import { useEffect, useState } from 'react';
import { Stage, Tag, Display, Btn, Ghost } from '@/components/ui';
import { BreathOrb, type BreathPhase } from '@/components/BreathOrb';

const CYCLE: { name: string; ms: number; key: BreathPhase }[] = [
  { name: 'Ein',  ms: 4000, key: 'in' },
  { name: 'Halt', ms: 4000, key: 'hold' },
  { name: 'Aus',  ms: 6000, key: 'out' },
];
const ROUNDS = 4;

export function Breath({
  onComplete,
  onExit,
}: {
  onComplete: () => void;
  onExit: () => void;
}) {
  const [round, setRound] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (round >= ROUNDS) return;
    const t = setTimeout(() => {
      const nextStep = (step + 1) % CYCLE.length;
      const nextRound = nextStep === 0 ? round + 1 : round;
      setStep(nextStep);
      setRound(nextRound);
    }, CYCLE[step].ms);
    return () => clearTimeout(t);
  }, [step, round]);

  if (round >= ROUNDS) {
    return (
      <Stage>
        <Tag>Atem</Tag>
        <div className="h-8" />
        <Display>Das Nervensystem hat gehört.</Display>
        <div className="h-7" />
        <p className="text-ink-dim text-[17px]">Geh ruhig weiter.</p>
        <div className="h-12" />
        <Btn onClick={onComplete}>Weiter</Btn>
      </Stage>
    );
  }

  return (
    <Stage>
      <Tag>Atem · Runde {round + 1} von {ROUNDS}</Tag>
      <div className="h-12" />
      <div className="flex justify-center">
        <BreathOrb size={240} phase={CYCLE[step].key} label={CYCLE[step].name} />
      </div>
      <div className="h-20" />
      <Ghost onClick={onExit}>Beenden</Ghost>
    </Stage>
  );
}
