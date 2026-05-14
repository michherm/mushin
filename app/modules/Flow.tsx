'use client';

import { useEffect, useState } from 'react';
import { Stage, Tag, Display, Btn, Ghost } from '@/components/ui';
import { BreathOrb } from '@/components/BreathOrb';
import { useSoundscape } from '@/lib/useSoundscape';

const FLOW_SECONDS = 60;

export function Flow({
  onComplete,
  onExit,
}: {
  onComplete: () => void;
  onExit: () => void;
}) {
  useSoundscape('flow');

  const [seconds, setSeconds] = useState(FLOW_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  if (seconds <= 0) {
    return (
      <Stage glowColor="breath">
        <Tag color="breath">Flow</Tag>
        <div className="h-8" />
        <Display>Vorbei.</Display>
        <div className="h-12" />
        <Btn onClick={onComplete}>Weiter</Btn>
      </Stage>
    );
  }

  const orbPhase =
    seconds % 10 < 4 ? 'in' :
    seconds % 10 < 6 ? 'hold' : 'out';

  return (
    <Stage glowColor="breath">
      <Tag color="breath">Beobachten · Wasser</Tag>
      <div className="h-8" />
      <Display className="!text-[clamp(32px,5vw,44px)]">
        Gedanken ziehen durch.
      </Display>
      <div className="h-5" />
      <p className="text-ink-dim text-[17px] max-w-[460px] mx-auto leading-[1.6]">
        Nicht festhalten. Nicht wegdrücken. Wasser.
      </p>
      <div className="h-12" />
      <div className="flex justify-center">
        <BreathOrb size={180} phase={orbPhase} color="breath" />
      </div>
      <div className="h-10" />
      <span className="font-ui text-ink-dim text-[14px] tracking-tag font-semibold">
        {String(seconds).padStart(2, '0')}
      </span>
      <div className="h-6" />
      <Ghost onClick={onExit}>Beenden</Ghost>
    </Stage>
  );
}
