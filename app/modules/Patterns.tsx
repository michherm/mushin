'use client';

import { useEffect, useState } from 'react';
import { Stage, Tag, Display, Btn } from '@/components/ui';
import { store } from '@/lib/store';

const LABELS: Record<string, string> = {
  // Zustände
  calm: 'Klarheit',
  activated: 'Aktiviert',
  rumination: 'Grübeln',
  spiral: 'Spirale',
  dissociated: 'Distanziert',
  actionReady: 'Handlungsbereit',
  blocked: 'Blockiert',
  // Module
  stand: 'Stand',
  breath: 'Atem',
  flow: 'Flow',
  ground: 'Erden',
  action: 'Handlung',
  emergency: 'Reduktion',
  sensei: 'Sensei',
};

export function Patterns({ onExit }: { onExit: () => void }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setCounts(store.counts());
  }, []);

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <Stage>
      <Tag>Beobachtung</Tag>
      <div className="h-7" />
      <Display className="!text-[clamp(28px,4vw,40px)]">
        Was wiederkommt.
      </Display>
      <div className="h-4" />
      <p className="text-ink-dim text-[16px] max-w-[460px] mx-auto">
        Keine Geschichten. Keine Inhalte. Nur Muster.
      </p>
      <div className="h-10" />

      {entries.length === 0 ? (
        <p className="text-ink-mute italic">Noch keine Sessions.</p>
      ) : (
        <div className="border border-line text-left">
          {entries.map(([key, count], idx) => (
            <div
              key={key}
              className={`flex justify-between items-center px-5 py-4 ${
                idx < entries.length - 1 ? 'border-b border-line' : ''
              }`}
            >
              <span className="text-[18px]">{LABELS[key] ?? key}</span>
              <span className="font-mono text-accent text-[14px] tracking-[0.2em]">
                {String(count).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="h-8" />
      <Btn onClick={onExit}>Zurück</Btn>
    </Stage>
  );
}
