'use client';

/**
 * SENSEI — der KI-Coach.
 *
 * Bewusst kein Klangbett — Sensei ist Stille.
 * Sehr ruhige Bühne, wärmere Farben als vorher.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Stage, Tag, Display, Rule, Btn, Ghost, BoneCue } from '@/components/ui';
import { useSensei, type SenseiResult } from '@/lib/useSensei';
import { useSoundscape } from '@/lib/useSoundscape';
import { store } from '@/lib/store';
import type { Level, ZustandsKey } from '@/lib/library';

const HISTORY_LIMIT = 3;
const RECENT_LIMIT = 3;
const SPIRAL_FORCE_THRESHOLD = 3;

const STATE_LABELS: Record<ZustandsKey, string> = {
  calm: 'Klar',
  activated: 'Aktiviert',
  rumination: 'Grübeln',
  spiral: 'Spirale',
  dissociated: 'Distanziert',
  actionReady: 'Handlungsbereit',
  blocked: 'Blockiert',
};

/** Erkennt Cantienica-Knochen-Begriffe in der Antwort, um sie zu highlighten. */
const BONE_PATTERNS = [
  /Levator ani/gi, /Sitzbeinhöcker/gi, /Kronenpunkt/gi, /Zwerchfell/gi,
  /Kreuzbein/gi, /Steißbein/gi, /Schambein/gi, /Hinterkopf/gi,
  /Schultergürtel/gi, /Schulterblätter/gi, /Wirbelsäule/gi,
  /Aufspannung/gi, /Fußgewölbe/gi,
];

function highlightBones(text: string): React.ReactNode {
  if (!text) return text;
  // Sammle alle Treffer
  const matches: { idx: number; len: number; word: string }[] = [];
  BONE_PATTERNS.forEach(p => {
    p.lastIndex = 0;
    let m;
    while ((m = p.exec(text)) !== null) {
      matches.push({ idx: m.index, len: m[0].length, word: m[0] });
    }
  });
  if (matches.length === 0) return text;
  matches.sort((a, b) => a.idx - b.idx);

  // Baue Teile
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (m.idx < cursor) return; // Überlappung ignorieren
    if (m.idx > cursor) parts.push(text.slice(cursor, m.idx));
    parts.push(<BoneCue key={i}>{m.word}</BoneCue>);
    cursor = m.idx + m.len;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

export function Sensei({
  level,
  onModule,
  onExit,
}: {
  level: Level;
  onModule: (m: string) => void;
  onExit: () => void;
}) {
  useSoundscape('silence'); // Sensei ist still

  const [history, setHistory] = useState<string[]>([]);
  const [recentLines, setRecentLines] = useState<string[]>([]);
  const [spiralCount, setSpiralCount] = useState(0);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<SenseiResult | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { ask, loading } = useSensei();

  useEffect(() => {
    if (spiralCount >= SPIRAL_FORCE_THRESHOLD) {
      onModule('emergency');
    }
  }, [spiralCount, onModule]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const result = await ask({
      text, level, history, recentlyUsed: recentLines,
    });

    if (result.state === 'spiral' || result.state === 'rumination') {
      setSpiralCount(c => c + 1);
    } else {
      setSpiralCount(0);
    }

    setHistory(h => [...h.slice(-(HISTORY_LIMIT - 1)), text]);
    setRecentLines(r => [...r.slice(-(RECENT_LIMIT - 1)), result.intervention.line1]);

    store.record({
      type: 'sensei',
      state: result.state,
      intervention: result.intervention.line1,
    });

    setResponse(result);
    setInput('');
  }, [input, level, history, recentLines, ask, loading]);

  if (loading) {
    return (
      <Stage>
        <Tag color="accent">Sensei</Tag>
        <div className="h-8" />
        <div className="text-ink-dim italic font-serif text-[24px] animate-pulse">
          …
        </div>
      </Stage>
    );
  }

  if (!response) {
    return (
      <Stage>
        <Tag color="accent">Sensei · Adaptiver Coach</Tag>
        <div className="h-7" />
        <Display className="!text-[clamp(28px,4vw,40px)] mb-4">
          Was beschäftigt dich?
        </Display>
        <p className="text-ink-dim text-[16px] mb-7 leading-[1.6]">
          Ein Satz. Nicht mehr. Sensei spricht nur das Nötige.
        </p>
        <textarea
          ref={inputRef}
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="…"
          className="w-full min-h-[100px] bg-bg-warm/50 text-ink border border-line focus:border-accent outline-none px-5 py-4 font-serif text-[20px] font-light leading-[1.4] resize-none rounded-sm transition-colors"
        />
        <div className="h-6" />
        <Btn onClick={send} disabled={!input.trim()}>Senden</Btn>
        <div className="h-2" />
        <Ghost onClick={onExit}>Zurück</Ghost>
      </Stage>
    );
  }

  const { intervention, state, source } = response;

  return (
    <Stage>
      <Tag>Antwort</Tag>
      <div className="h-7" />
      <Display>{highlightBones(intervention.line1)}</Display>
      {intervention.line2 && (
        <>
          <div className="h-5" />
          <p className="text-ink-dim leading-[1.6] max-w-[520px] mx-auto"
             style={{ fontSize: 'clamp(18px, 2.5vw, 22px)' }}>
            {highlightBones(intervention.line2)}
          </p>
        </>
      )}
      {intervention.line3 && (
        <>
          <div className="h-3" />
          <p className="leading-[1.6] max-w-[520px] mx-auto"
             style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: '#7A6E58' }}>
            {highlightBones(intervention.line3)}
          </p>
        </>
      )}
      <div className="h-10" />
      <div className="flex justify-center"><Rule /></div>
      <div className="h-7" />

      <div className="flex gap-3 flex-wrap justify-center">
        {intervention.action === 'stand'       && <Btn onClick={() => onModule('stand')}>Zur Stand-Sequenz</Btn>}
        {intervention.action === 'aufspannung' && <Btn onClick={() => onModule('aufspannung')}>Zur Aufspannung</Btn>}
        {intervention.action === 'breath'      && <Btn kind="breath" onClick={() => onModule('breath')}>Zur Atmung</Btn>}
        {intervention.action === 'emergency'   && <Btn kind="ember" onClick={() => onModule('emergency')}>Reduktion</Btn>}
        {intervention.action === 'flow'        && <Btn kind="breath" onClick={() => onModule('flow')}>Beobachten</Btn>}
        {intervention.action === 'ground'      && <Btn onClick={() => onModule('ground')}>Erden</Btn>}
        {intervention.action === 'action'      && <Btn onClick={() => onModule('action')}>Ein Schritt</Btn>}

        <Btn kind="secondary" onClick={() => setResponse(null)}>
          Weiter sprechen
        </Btn>
      </div>

      <div className="h-8" />
      <div className="flex gap-3 justify-center items-center">
        <Tag color="mute">Zustand · {STATE_LABELS[state]}</Tag>
        <Tag color="mute">·</Tag>
        <Tag color="mute">
          {source === 'claude' ? 'Sensei live' : source === 'fallback' ? 'Sensei offline' : 'Lokal'}
        </Tag>
      </div>
    </Stage>
  );
}
