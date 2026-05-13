/**
 * STORE
 *
 * Pattern-Tracking. Speichert KEINE Inhalte. Nur:
 *   - welcher Zustand wurde erkannt
 *   - welche Intervention wurde gewählt
 *   - Zeitstempel
 *
 * Persistenz: localStorage (Client-Side, SSR-safe).
 * Bei Supabase-Anbindung: ersetzt diese Datei, Interface bleibt gleich.
 */

import type { ZustandsKey } from './library';

export interface SessionEvent {
  type: 'sensei' | 'stand' | 'breath' | 'flow' | 'ground' | 'action' | 'emergency';
  state?: ZustandsKey;
  intervention?: string; // nur line1, kein Nutzerinhalt
  t: number;
}

const STORAGE_KEY = 'mushin.sessions.v1';
const MAX_EVENTS = 500; // wir wachsen nicht ins Unermessliche

function safeRead(): SessionEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWrite(events: SessionEvent[]): void {
  if (typeof window === 'undefined') return;
  try {
    const trimmed = events.slice(-MAX_EVENTS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Quota überschritten oder Storage gesperrt — wir akzeptieren das schweigend.
  }
}

export const store = {
  record(event: Omit<SessionEvent, 't'>): void {
    const events = safeRead();
    events.push({ ...event, t: Date.now() });
    safeWrite(events);
  },
  all(): SessionEvent[] {
    return safeRead();
  },
  clear(): void {
    if (typeof window === 'undefined') return;
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  },
  /** Aggregate by state/type — für die Beobachtungs-Ansicht. */
  counts(): Record<string, number> {
    const c: Record<string, number> = {};
    for (const e of safeRead()) {
      const key = e.state ?? e.type;
      c[key] = (c[key] ?? 0) + 1;
    }
    return c;
  },
};
