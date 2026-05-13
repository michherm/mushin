'use client';

import { useState } from 'react';
import { Stage, Tag, Display, Btn, Ghost } from '@/components/ui';

const STEPS = [
  { n: 5, sense: 'siehst',   detail: 'Form. Farbe. Textur.' },
  { n: 4, sense: 'fühlst',   detail: 'Stoff. Boden. Haut.' },
  { n: 3, sense: 'hörst',    detail: 'Nah und fern.' },
  { n: 2, sense: 'riechst',  detail: 'Auch leise Düfte.' },
  { n: 1, sense: 'schmeckst', detail: 'Mund. Speichel. Atem.' },
];

export function Ground({
  onComplete,
  onExit,
}: {
  onComplete: () => void;
  onExit: () => void;
}) {
  const [i, setI] = useState(0);

  if (i >= STEPS.length) {
    return (
      <Stage>
        <Tag>Erden</Tag>
        <div className="h-8" />
        <Display>Du bist hier.</Display>
        <div className="h-12" />
        <Btn onClick={onComplete}>Weiter</Btn>
      </Stage>
    );
  }

  const s = STEPS[i];

  return (
    <Stage>
      <Tag>Erden · {s.n} · 5</Tag>
      <div className="h-8" />
      <Display>
        <span className="text-accent">{s.n}</span> Dinge, die du {s.sense}.
      </Display>
      <div className="h-5" />
      <p className="text-ink-dim text-[17px]">{s.detail}</p>
      <div className="h-12" />
      <Btn onClick={() => setI(i + 1)}>Habe.</Btn>
      <div className="h-2" />
      <Ghost onClick={onExit}>Abbrechen</Ghost>
    </Stage>
  );
}
