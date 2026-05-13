'use client';

import { useEffect, useState } from 'react';
import { Tag, Display, Rule } from '@/components/ui';
import type { Level } from '@/lib/library';

interface Module {
  id: string;
  glyph: string;
  name: string;
  sub: string;
  duration: string;
  what: string;       // konkret: was passiert hier (eine Zeile)
  accent?: boolean;
}

const MODULES: Module[] = [
  {
    id: 'stand',
    glyph: '一',
    name: 'Stand',
    sub: 'Aufrichtung von Ferse bis Krone.',
    duration: '3 min',
    what: 'Neun Knochen-Punkte, einer nach dem anderen.',
  },
  {
    id: 'aufspannung',
    glyph: '二',
    name: 'Aufspannung',
    sub: 'Im Sitzen. Überall machbar.',
    duration: '90 s',
    what: 'Sitzbeinhöcker, Kronenpunkt, diagonal beatmen.',
  },
  {
    id: 'breath',
    glyph: '三',
    name: 'Atem',
    sub: 'Vier · Vier · Sechs.',
    duration: '4 Runden',
    what: 'Zwerchfell senken. Nervensystem beruhigen.',
  },
  {
    id: 'sensei',
    glyph: '四',
    name: 'Sensei',
    sub: 'Adaptiver Coach.',
    duration: 'offen',
    what: 'Tipp einen Satz. Drei Zeilen zurück.',
    accent: true,
  },
  {
    id: 'flow',
    glyph: '五',
    name: 'Flow',
    sub: 'Beobachten. Nicht festhalten.',
    duration: '1 min',
    what: 'Gedanken ziehen durch wie Wasser.',
  },
  {
    id: 'ground',
    glyph: '六',
    name: 'Erden',
    sub: 'Bei Dissoziation. Fünf Sinne.',
    duration: '2 min',
    what: 'Was siehst du? Fühlst du? Hörst du?',
  },
  {
    id: 'action',
    glyph: '七',
    name: 'Handlung',
    sub: 'Ein konkreter Schritt.',
    duration: '1 min',
    what: 'Eine Bewegung. Klein. Real. Jetzt.',
  },
];

/* Wechselnde Tagesgrüße — abhängig von Uhrzeit */
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
    <div className="min-h-screen px-6 pt-14 pb-24 max-w-[980px] mx-auto relative">
      {/* Warmer Glow im Hintergrund */}
      <div
        aria-hidden
        className="warm-glow"
        style={{
          top: '5%', left: '10%',
          width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, rgba(217, 190, 133, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="animate-rise relative z-10">
        {/* Kopfzeile */}
        <div className="flex justify-between items-center mb-8">
          <Tag color="accent">無心 · Mushin</Tag>
          <button
            onClick={() => setLevel(level === 'beginner' ? 'cantienica' : 'beginner')}
            className="bg-transparent border border-line text-ink-dim font-mono text-[9px] tracking-[0.24em] uppercase px-3 py-2 min-h-[36px] hover:border-accent hover:text-accent transition-colors"
          >
            {level === 'cantienica' ? 'Cantienica' : 'Basis'}
          </button>
        </div>

        {/* Tageszeit-Gruß */}
        <Tag color="dim">{hour}</Tag>
        <div className="h-3" />

        {/* Hauptbotschaft */}
        <Display className="!text-[clamp(44px,9vw,80px)]">
          Stehe zuerst.<br />
          <span className="text-ink-dim">Denken später.</span>
        </Display>
        <div className="h-6" />

        {/* Cantienica-Anker — Knochen denken */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-bg-warm/50 border border-line-hi/50">
          <div className="w-1 h-1 rotate-45 bg-accent" />
          <span className="font-serif italic text-accent text-[16px]">
            Knochen denken.
          </span>
          <span className="font-mono text-ink-mute text-[9px] tracking-[0.3em] uppercase">
            Isabelle
          </span>
        </div>

        <div className="h-6" />
        <p
          className="text-ink-dim font-light leading-[1.6] max-w-[520px]"
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

      {/* Hilfeleitfaden — was tut man wann? */}
      <div className="mb-8 px-4 py-3 rounded-lg bg-bg-warm/30 border border-line/50 max-w-[680px]">
        <p className="text-ink-dim text-[14px] leading-[1.6]" style={{ fontStyle: 'italic' }}>
          Beginne mit <span className="text-accent">Stand</span> oder <span className="text-accent">Aufspannung</span>.
          Bei innerem Lärm zu <span className="text-accent">Sensei</span>.
          Wenn nichts geht — der rote Knopf unten.
        </p>
      </div>

      {/* Module — jetzt mit Dauer und Beschreibung */}
      <div
        className="grid gap-px bg-line border border-line rounded-sm overflow-hidden relative z-10"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
      >
        {MODULES.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => go(m.id)}
            className="bg-bg text-ink text-left p-6 min-h-[210px] flex flex-col justify-between transition-all duration-500 hover:bg-bg-warm cursor-pointer border-0 group"
          >
            <div className="flex justify-between items-start">
              <div
                className={`font-serif font-light text-[44px] leading-none transition-all duration-500 ${
                  m.accent ? 'text-accent group-hover:text-glow' : 'text-accent opacity-65 group-hover:opacity-100'
                }`}
              >
                {m.glyph}
              </div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-ink-mute uppercase">
                {m.duration}
              </span>
            </div>

            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-ink-mute uppercase">
                0{idx + 1}
              </span>
              <div className="h-1.5" />
              <div className="text-[22px] font-light text-ink">{m.name}</div>
              <div className="text-ink-dim text-[13px] mt-0.5">{m.sub}</div>
              <div className="text-ink-mute text-[12px] mt-2 italic font-serif leading-[1.4]">
                {m.what}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="h-8" />

      {/* Emergency-Knopf — warm-rot statt hart-rot */}
      <button
        onClick={() => go('emergency')}
        className="w-full bg-bg-ink border border-ember/70 text-ember p-5 font-mono text-[11px] tracking-[0.32em] uppercase min-h-[56px] hover:bg-ember/10 hover:border-ember transition-all duration-300 rounded-sm relative z-10"
      >
        <span className="opacity-90">Ich hänge fest</span>
      </button>

      <div className="h-12" />

      {/* Footer */}
      <div className="flex justify-between items-center relative z-10">
        <button
          onClick={() => go('patterns')}
          className="bg-transparent border-0 text-ink-mute font-mono text-[10px] tracking-[0.3em] uppercase cursor-pointer p-3 min-h-[40px] hover:text-accent transition-colors"
        >
          Muster ansehen →
        </button>
        <span className="font-mono text-[9px] tracking-[0.3em] text-ink-mute uppercase">
          Aufspannung trägt
        </span>
      </div>
    </div>
  );
}
