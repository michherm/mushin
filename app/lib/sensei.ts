/**
 * SENSEI ENGINE
 *
 * State Intervention Architecture. Kein Chatbot.
 *
 * Pipeline:
 *   input
 *     → classify(state)
 *     → detectSpiral(history)  ← kann state auf 'spiral' upgraden
 *     → selectIntervention(state, level, recent)
 *     → trackPattern(state, intervention)    ← in Store
 *
 * Bei späterer Claude-API-Anbindung tauschst du nur classify() aus.
 * Der Rest des Systems weiß nichts davon.
 */

import { LIBRARY, type ZustandsKey, type Level, type Intervention } from './library';

/* ════════════════════════════════════════════════════════════════════════
   KLASSIFIKATION
   Heuristik. Deterministisch. Nachvollziehbar.
   ════════════════════════════════════════════════════════════════════════ */

interface ClassifyOptions {
  history?: string[];
  spiralCount?: number;
}

const MARKERS = {
  loop:     /grübel|immer wieder|wieder und wieder|ständig|kreis|nicht aufhör|loswerd|raus.*kopf|kreise|loop|denke nur noch|geht nicht aus dem kopf|im kreis/i,
  ruminate: /was wäre wenn|hätte ich|sollte ich|warum hab ich|wenn ich nur|warum nicht|hätt[ae] ich|wenn ich damals/i,
  spiral:   /panik|katastrop|alles kaputt|nicht mehr|kann nicht mehr|halt es nicht|breche zusammen|ertrink|erstick|am ende/i,
  dissoc:   /nicht real|weit weg|nicht da|fremd|verschwomm|wie in watte|leer|tot|nichts mehr|nebel/i,
  action:   /muss|sollte ich|jetzt|tun|machen|anfangen|beginnen|nächst|als nächstes/i,
  blocked:  /weiß nicht weiter|festgefahren|stecke fest|blockiert|geht nichts|wie soll ich|finde keinen|keine ahnung wie/i,
};

/**
 * Klassifiziere eine Eingabe in einen Zustand.
 * Reihenfolge der Checks ist absichtlich — spiral und dissoc vor allem anderen.
 */
export function classify(input: string, opts: ClassifyOptions = {}): ZustandsKey {
  const text = (input || '').toLowerCase().trim();
  if (!text) return 'calm';

  const wordCount = text.split(/\s+/).length;
  const history = opts.history ?? [];

  // 1) Spiralen-Signale haben Priorität
  if (MARKERS.spiral.test(text)) return 'spiral';
  if (wordCount > 80) return 'spiral'; // Schwall → eskalierte Aktivierung

  // 2) Wiederholung aus History → Spirale
  if (history.length >= 1) {
    const last = history[history.length - 1] || '';
    const sim = jaccardSimilarity(text, last.toLowerCase());
    if (sim > 0.4 && (MARKERS.loop.test(text) || MARKERS.ruminate.test(text))) {
      return 'spiral';
    }
  }

  // 3) Dissoziation
  if (MARKERS.dissoc.test(text)) return 'dissociated';

  // 4) Grübeln
  if (MARKERS.loop.test(text)) return 'rumination';
  if (MARKERS.ruminate.test(text)) return 'rumination';

  // 5) Handlung / Blockade
  if (MARKERS.blocked.test(text)) return 'blocked';
  if (MARKERS.action.test(text) && wordCount < 30) return 'actionReady';

  // 6) Default: aktiviert
  return wordCount > 40 ? 'activated' : 'activated';
}

/* ────────────────────────────────────────────────────────────────────── */

/** Jaccard auf bedeutsamen Wörtern (> 3 Zeichen). Primitiv, aber wirksam. */
export function jaccardSimilarity(a: string, b: string): number {
  const tokensA = new Set(a.split(/\W+/).filter(w => w.length > 3));
  const tokensB = new Set(b.split(/\W+/).filter(w => w.length > 3));
  if (tokensA.size === 0 || tokensB.size === 0) return 0;
  const intersection = [...tokensA].filter(x => tokensB.has(x)).length;
  const union = new Set([...tokensA, ...tokensB]).size;
  return intersection / union;
}

/* ════════════════════════════════════════════════════════════════════════
   AUSWAHL
   ════════════════════════════════════════════════════════════════════════ */

export interface SelectOptions {
  level: Level;
  recentlyUsed?: string[]; // line1-Werte, um Wiederholung zu vermeiden
}

export function selectIntervention(
  state: ZustandsKey,
  opts: SelectOptions,
): Intervention {
  const { level, recentlyUsed = [] } = opts;

  const bucket =
    LIBRARY[state]?.[level] ??
    LIBRARY[state]?.beginner ??
    LIBRARY.activated.beginner;

  // Vermeide direkt vorhergehende Wiederholung
  const fresh = bucket.filter(i => !recentlyUsed.includes(i.line1));
  const pool = fresh.length > 0 ? fresh : bucket;

  return pool[Math.floor(Math.random() * pool.length)];
}

/* ════════════════════════════════════════════════════════════════════════
   PUBLIC FACADE
   Ein einziger Einstiegspunkt für die UI.
   ════════════════════════════════════════════════════════════════════════ */

export interface SenseiInput {
  text: string;
  level: Level;
  history: string[];
  recentlyUsed: string[];
}

export interface SenseiOutput {
  state: ZustandsKey;
  intervention: Intervention;
}

export function intervene(input: SenseiInput): SenseiOutput {
  const state = classify(input.text, { history: input.history });
  const intervention = selectIntervention(state, {
    level: input.level,
    recentlyUsed: input.recentlyUsed,
  });
  return { state, intervention };
}
