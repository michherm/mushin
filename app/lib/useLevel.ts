/**
 * useLevel — adaptives Vokabular.
 * Standard: 'cantienica' (du bist erfahren). Schalter im Home.
 */

'use client';

import { useEffect, useState } from 'react';
import type { Level } from './library';

const KEY = 'mushin.level';

export function useLevel(): [Level, (l: Level) => void] {
  const [level, setLevelState] = useState<Level>('cantienica');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY) as Level | null;
      if (stored === 'beginner' || stored === 'cantienica') {
        setLevelState(stored);
      }
    } catch { /* ignore */ }
  }, []);

  const setLevel = (l: Level) => {
    setLevelState(l);
    try { window.localStorage.setItem(KEY, l); } catch { /* ignore */ }
  };

  return [level, setLevel];
}
