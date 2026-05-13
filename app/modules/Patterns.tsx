'use client';

import { useEffect, useState } from 'react';
import { Stage, Tag, Display, Btn } from '@/components/ui';
import { store } from '@/lib/store';

const LABELS: Record<string, string> = {
  calm: 'Klarheit', activated: 'Aktiviert',
  rumination: 'Grübeln', spiral: 'Spirale',
  dissociated: 'Distanziert', actionReady: 'Handlungsbereit',
  blocked: 'Blockiert',
  stand: 'Stand', breath: 'Atem', flow: 'Flow',
  ground: 'Erden', action: 'Handlung', emergency: 'Reduktion',
  sensei: 'Sensei',
};

export function Patterns({ onExit }: { onExit: () => void }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setCounts(store.counts());
  }, []);

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, c]) => sum + c, 0);

  return (
    <Stage>
      <Tag color="accent">Beobachtung</Tag>
      <div className="h-7" />
      <Display className="!text-[clamp(28px,4vw,40px)]">
        Was wiederkommt.
      </Display>
      <div className="h-4" />
      <p className="text-ink-dim text-[16px] max-w-[460px] mx-auto leading-[1.6]">
        Keine Geschichten. Keine Inhalte. Nur Muster.
      </p>
      <div className="h-10" />

      {entries.length === 0 ? (
        <p className="text-ink-mute italic font-serif">Noch keine Sessions.</p>
      ) : (
        <div className="border border-line text-left rounded-sm overflow-hidden">
          {entries.map(([key, count], idx) => {
            const ratio = count / Math.max(...entries.map(([, c]) => c));
            return (
              <div
                key={key}
                className={`flex justify-between items-center px-5 py-4 relative bg-bg ${
                  idx < entries.length - 1 ? 'border-b border-line' : ''
                }`}
              >
                {/* Hintergrundbalken — visuelles Maß */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-accent/10"
                  style={{ width: `${ratio * 100}%` }}
                />
                <span className="text-[17px] relative z-10">{LABELS[key] ?? key}</span>
                <span className="font-mono text-accent text-[14px] tracking-[0.2em] relative z-10">
                  {String(count).padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {total > 0 && (
        <p className="text-ink-mute text-[12px] mt-6 font-mono tracking-[0.2em]">
          Gesamt: {total} Sessions
        </p>
      )}

      <div className="h-8" />
      <Btn onClick={onExit}>Zurück</Btn>
    </Stage>
  );
}
