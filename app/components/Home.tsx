'use client';

import { Tag, Display, Rule } from '@/components/ui';
import type { Level } from '@/lib/library';

interface Module {
  id: string;
  glyph: string;
  name: string;
  sub: string;
  accent?: boolean;
}

const MODULES: Module[] = [
  { id: 'stand',       glyph: '一', name: 'Stand',       sub: 'Aufrichtung zuerst.' },
  { id: 'aufspannung', glyph: '二', name: 'Aufspannung', sub: 'Im Sitzen. 90 Sekunden.' },
  { id: 'breath',      glyph: '三', name: 'Atem',        sub: 'Vier · Vier · Sechs.' },
  { id: 'sensei',      glyph: '四', name: 'Sensei',      sub: 'Adaptiver Coach.', accent: true },
  { id: 'flow',        glyph: '五', name: 'Flow',        sub: 'Beobachten. Nicht festhalten.' },
  { id: 'ground',      glyph: '六', name: 'Erden',       sub: 'Fünf Sinne, zurück.' },
  { id: 'action',      glyph: '七', name: 'Handlung',    sub: 'Ein Schritt. Jetzt.' },
];

export function Home({
  go,
  level,
  setLevel,
}: {
  go: (id: string) => void;
  level: Level;
  setLevel: (l: Level) => void;
}) {
  return (
    <div className="min-h-screen px-6 pt-14 pb-24 max-w-[980px] mx-auto">
      <div className="animate-rise">
        <div className="flex justify-between items-center mb-8">
          <Tag color="accent">無心 · Mushin</Tag>
          <button
            onClick={() => setLevel(level === 'beginner' ? 'cantienica' : 'beginner')}
            className="bg-transparent border border-line text-ink-dim font-mono text-[9px] tracking-[0.24em] uppercase px-3 py-2 min-h-[36px] hover:border-line-hi transition-colors"
          >
            {level === 'cantienica' ? 'Cantienica' : 'Basis'}
          </button>
        </div>

        <Display className="!text-[clamp(44px,9vw,80px)]">
          Stehe zuerst.<br />
          <span className="text-ink-dim">Denken später.</span>
        </Display>
        <div className="h-5" />
        <p
          className="text-ink-dim font-light leading-[1.5] max-w-[520px]"
          style={{ fontSize: 'clamp(16px, 2.2vw, 19px)' }}
        >
          Kein Journal. Kein Coach. Ein Dojo.
          Geschwindigkeit entsteht durch weniger Widerstand.
        </p>
      </div>

      <div className="h-14" />
      <Rule width={80} />
      <div className="h-12" />

      <div
        className="grid gap-px bg-line border border-line"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
      >
        {MODULES.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => go(m.id)}
            className="bg-bg text-ink text-left p-7 min-h-[180px] flex flex-col justify-between transition-colors duration-500 hover:bg-bg-raise cursor-pointer border-0"
          >
            <div className={`font-serif font-light text-[48px] text-accent ${m.accent ? 'opacity-100' : 'opacity-65'}`}>
              {m.glyph}
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-ink-mute uppercase">
                0{idx + 1}
              </span>
              <div className="h-1.5" />
              <div className="text-[22px] font-light text-ink">{m.name}</div>
              <div className="text-ink-dim text-[14px] mt-0.5">{m.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="h-8" />

      <button
        onClick={() => go('emergency')}
        className="w-full bg-bg-ink border border-ember text-ember p-5 font-mono text-[11px] tracking-[0.32em] uppercase min-h-[56px] hover:bg-[#1a0e0c] transition-colors"
      >
        Ich hänge fest
      </button>

      <div className="h-14" />

      <button
        onClick={() => go('patterns')}
        className="bg-transparent border-0 text-ink-mute font-mono text-[10px] tracking-[0.3em] uppercase cursor-pointer p-3 min-h-[40px] hover:text-ink-dim"
      >
        Muster ansehen →
      </button>
    </div>
  );
}
