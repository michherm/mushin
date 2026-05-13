/**
 * useSensei — Client-Hook für die KI.
 *
 * Strategie:
 *   1. API aufrufen (/api/sensei) → Claude im Backend
 *   2. Wenn API fehlschlägt: lokale Heuristik (selbe Bibliothek)
 *
 * Vorteil: die App funktioniert IMMER. Mit oder ohne Key. Mit oder ohne Netz.
 * Der Nutzer merkt im Idealfall nichts.
 */

'use client';

import { useCallback, useState } from 'react';
import { intervene as localIntervene } from './sensei';
import type { Level, ZustandsKey } from './library';

export interface SenseiResult {
  state: ZustandsKey;
  intervention: {
    line1: string;
    line2?: string;
    line3?: string;
    action: string | null;
  };
  source: 'claude' | 'fallback' | 'local';
}

export interface UseSenseiInput {
  text: string;
  level: Level;
  history: string[];
  recentlyUsed: string[];
}

export function useSensei() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async (input: UseSenseiInput): Promise<SenseiResult> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/sensei', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text: input.text,
          level: input.level,
          history: input.history,
        }),
        // Wenn API zu lange braucht, brechen wir ab — Sensei soll nicht warten lassen
        signal: AbortSignal.timeout(8000),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();

      if (!data.state || !data.intervention) {
        throw new Error('Invalid response');
      }

      return data as SenseiResult;
    } catch (err) {
      // Fallback: lokale Engine
      const msg = err instanceof Error ? err.message : 'unknown';
      setError(msg);
      console.warn('[sensei] Fallback to local:', msg);

      const { state, intervention } = localIntervene({
        text: input.text,
        level: input.level,
        history: input.history,
        recentlyUsed: input.recentlyUsed,
      });

      return {
        state,
        intervention: {
          line1: intervention.line1,
          line2: intervention.line2,
          action: intervention.action ?? null,
        },
        source: 'local',
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return { ask, loading, error };
}
