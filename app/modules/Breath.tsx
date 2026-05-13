'use client';

import { useEffect, useState } from 'react';
import { Stage, Tag, Display, Btn, Ghost } from '@/components/ui';
import { BreathOrb, type BreathPhase } from '@/components/BreathOrb';
import { useSoundscape } from '@/lib/useSoundscape';

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
  useSoundscape('breath');

  const [round, setRound] = useState(0);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || round >= ROUNDS) return;
    const t = setTimeout(() => {
      const nextStep = (step + 1) % CYCLE.length;
      const nextRound = nextStep === 0 ? round + 1 : round;
      setStep(nextStep);
      setRound(nextRound);
    }, CYCLE[step].ms);
    return () => clearTimeout(t);
  }, [step, round, started]);

  // Einleitungs-Bühne — kurz erklären
  if (!started) {
    return (
      <Stage glowColor="breath">
        <Tag color="breath">Atem · Vier · Vier · Sechs</Tag>
        <div className="h-7" />
        <Display>Vier ein. Vier halten.<br /><span className="text-breath">Sechs aus.</span></Display>
        <div className="h-6" />
        <p className="text-ink-dim text-[16px] leading-[1.6] max-w-[460px] mx-auto">
          Vier Runden. Du folgst dem Kreis.
          Atem dehnt das Zwerchfell — das Nervensystem hört.
        </p>
        <div className="h-12" />
        <Btn kind="breath" onClick={() => setStarted(true)}>Beginnen</Btn>
        <div className="h-2" />
        <Ghost onClick={onExit}>Zurück</Ghost>
      </Stage>
    );
  }

  if (round >= ROUNDS) {
    return (
      <Stage glowColor="breath">
        <Tag color="breath">Atem</Tag>
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
    <Stage glowColor="breath">
      <Tag color="breath">Runde {round + 1} von {ROUNDS}</Tag>
      <div className="h-12" />
      <div className="flex justify-center">
        <BreathOrb size={240} phase={CYCLE[step].key} label={CYCLE[step].name} color="breath" />
      </div>
      <div className="h-20" />

      {/* Fortschrittskette */}
      <div className="flex justify-center gap-2 mb-6">
        {Array.from({ length: ROUNDS }).map((_, idx) => (
          <div
            key={idx}
            className="h-px rounded-full transition-all duration-500"
            style={{
              width: idx === round ? 24 : 12,
              background: idx < round ? '#7DA89C' : idx === round ? '#7DA89C' : '#2A3A35',
              opacity: idx <= round ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      <Ghost onClick={onExit}>Beenden</Ghost>
    </Stage>
  );
}
