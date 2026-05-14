'use client';

import { useState } from 'react';
import { Tag, Display, Rule } from '@/components/ui';
import type { Level } from '@/lib/library';

interface Module {
  id: string;
  glyph: string;
  name: string;
  sub: string;
  duration: string;
  what: string;
  accent?: boolean;
}

const MODULES: Module[] = [
  { id: 'stand',       glyph: '一', name: 'Stand',       sub: 'Aufrichtung von Ferse bis Krone.', duration: '3 min',    what: 'Neun Knochen-Punkte, einer nach dem anderen.' },
  { id: 'aufspannung', glyph: '二', name: 'Aufspannung', sub: 'Im Sitzen. Überall machbar.',      duration: '90 s',     what: 'Sitzbeinhöcker, Kronenpunkt, diagonal beatmen.' },
  { id: 'breath',      glyph: '三', name: 'Atem',        sub: 'Vier · Vier · Sechs.',             duration: '4 Runden', what: 'Zwerchfell senken. Nervensystem beruhigen.' },
  { id: 'sensei',      glyph: '四', name: 'Sensei',      sub: 'Adaptiver Coach.',                 duration: 'offen',    what: 'Tipp einen Satz. Drei Zeilen zurück.', accent: true },
  { id: 'flow',        glyph: '五', name: 'Flow',        sub: 'Beobachten. Nicht festhalten.',    duration: '1 min',    what: 'Gedanken ziehen durch wie Wasser.' },
  { id: 'ground',      glyph: '六', name: 'Erden',       sub: 'Bei Dissoziation. Fünf Sinne.',    duration: '2 min',    what: 'Was siehst du? Fühlst du? Hörst du?' },
  { id: 'action',      glyph: '七', name: 'Handlung',    sub: 'Ein konkreter Schritt.',           duration: '1 min',    what: 'Eine Bewegung. Klein. Real. Jetzt.' },
];

function greeting(): string {
  if (typeof window === 'undefined') return 'Stehe zuerst.';
  const h = new Date().getHours();
  if (h < 6)  return 'Es ist früh.';
  if (h < 11) return 'Guten Morgen.';
  if (h < 14) return 'Mittag.';
  if (h < 18) return 'Nachmittag.';
  if (h < 22) return 'Abend.';
  return 'Es ist spät.';
}

export function Home({
  go,
  level,
  setLevel,
}: {
  go: (id: string) => void;
  level: Level;
  setLevel: (l: Level) => void;
}) {
  const [hour] = useState(greeting());

  return (
    <div className="min-h-screen px-4 sm:px-6 pt-16 pb-24 max-w-[980px] mx-auto relative">
      <div
        aria-hidden
        className="warm-glow pointer-events-none"
        style={{
          top: '5%', left: '10%',
          width: '40vw', height: '40vw', maxWidth: '400px', maxHeight: '400px',
          background: 'radial-gradient(circle, rgba(94, 133, 144, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="animate-rise relative z-10">
        {/* Kopfzeile */}
        <div className="flex items-center mb-8">
          <Tag color="accent">無心 · Mushin</Tag>
        </div>

        {/* Tageszeit */}
        <Tag color="mute">{hour}</Tag>
        <div className="h-4" />

        {/* Hauptbotschaft */}
        <Display className="!text-[clamp(40px,8vw,64px)]">
          Stehe zuerst.<br />
          <span className="text-ink-dim">Denken später.</span>
        </Display>
        <div className="h-6" />

        {/* Knochen-Banner — Isabelles Mantra */}
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-bg-raise border border-line shadow-sm">
          <div className="w-1.5 h-1.5 rotate-45 bg-accent" />
          <span className="font-display italic text-accent text-[17px] font-medium">
            Knochen denken.
          </span>
          <span className="font-ui text-ink-mute text-[10px] tracking-tag uppercase font-semibold">
            Isabelle
          </span>
        </div>

        <div className="h-6" />
        <p
          className="text-ink-dim font-normal leading-[1.65] max-w-[540px]"
          style={{ fontSize: 'clamp(16px, 2.2vw, 18px)' }}
        >
          Kein Journal. Kein Coach. Ein Dojo.
          Geschwindigkeit entsteht durch weniger Widerstand.
          Aufspannung trägt — alles andere folgt.
        </p>
      </div>

      <div className="h-12" />
      <Rule width={80} />
      <div className="h-10" />

      {/* Hilfeleitfaden */}
      <div className="mb-8 px-5 py-4 rounded-xl bg-bg-raise border border-line max-w-[680px] shadow-sm">
        <p className="text-ink-dim text-[15px] leading-[1.6]">
          Beginne mit <span className="text-accent font-medium">Stand</span> oder <span className="text-accent font-medium">Aufspannung</span>.
          Bei innerem Lärm zu <span className="text-accent font-medium">Sensei</span>.
          Wenn nichts geht — der Knopf unten.
        </p>
      </div>

      {/* Module — abgerundete Karten mit Schatten */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 relative z-10">
        {MODULES.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => go(m.id)}
            className="bg-bg-raise text-ink text-left p-5 sm:p-6 min-h-[200px] sm:min-h-[220px] flex flex-col justify-between border border-line rounded-2xl shadow-sm cursor-pointer transition-all duration-300 hover:bg-bg-warm hover:border-line-hi hover:-translate-y-0.5 hover:shadow-md group"
          >
            <div className="flex justify-between items-start gap-2">
              <div
                className={`font-display font-normal text-[40px] sm:text-[48px] leading-none transition-all duration-500 ${
                  m.accent ? 'text-accent' : 'text-accent opacity-80 group-hover:opacity-100'
                }`}
              >
                {m.glyph}
              </div>
              <span className="font-ui text-[10px] sm:text-[11px] tracking-tag font-semibold text-ink-mute uppercase shrink-0 bg-bg-warm px-2.5 py-1 rounded-full">
                {m.duration}
              </span>
            </div>

            <div>
              <span className="font-ui text-[10px] sm:text-[11px] tracking-tag font-semibold text-ink-mute uppercase">
                0{idx + 1}
              </span>
              <div className="h-1" />
              <div className="text-[20px] sm:text-[24px] font-display font-normal text-ink leading-tight">{m.name}</div>
              <div className="text-ink-dim text-[14px] sm:text-[15px] mt-1.5 leading-snug">{m.sub}</div>
              <div className="text-ink-mute text-[12px] sm:text-[13px] mt-2.5 leading-relaxed hidden sm:block">
                {m.what}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="h-8" />

      {/* Emergency-Knopf */}
      <button
        onClick={() => go('emergency')}
        className="w-full bg-bg-raise border-[1.5px] border-ember text-ember p-5 sm:p-6 font-ui text-[12px] sm:text-[13px] font-semibold tracking-tag uppercase min-h-[60px] hover:bg-ember/8 hover:shadow-md transition-all duration-300 rounded-2xl shadow-sm relative z-10"
      >
        Ich hänge fest
      </button>

      <div className="h-12" />

      {/* Footer */}
      <div className="flex justify-between items-center relative z-10 gap-3">
        <button
          onClick={() => go('patterns')}
          className="bg-transparent border-0 text-ink-mute font-ui text-[11px] tracking-tag font-semibold uppercase cursor-pointer px-3 py-3 min-h-[44px] hover:text-accent transition-colors"
        >
          Muster →
        </button>
        <button
          onClick={() => setLevel(level === 'beginner' ? 'cantienica' : 'beginner')}
          className="bg-bg-raise border border-line text-ink-dim font-ui text-[11px] tracking-tag font-semibold uppercase px-4 py-2.5 min-h-[44px] hover:border-accent hover:text-accent transition-colors rounded-full shadow-sm"
        >
          {level === 'cantienica' ? 'Cantienica' : 'Basis'}
        </button>
      </div>
    </div>
  );
}
