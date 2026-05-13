'use client';

/**
 * useSoundscape — Hook für Modul-Klangbetten.
 *
 * Verwendung:
 *   useSoundscape('stand') // spielt das Stand-Bett, stoppt bei Unmount
 *
 * User-Präferenz wird in localStorage gespeichert. Standard: an.
 */

import { useEffect, useState } from 'react';
import { getSoundscape, type Soundscape } from './soundscape';

const PREF_KEY = 'mushin.sound';

export function useSoundscape(scape: Soundscape) {
  useEffect(() => {
    const engine = getSoundscape();

    // User-Präferenz laden
    try {
      const stored = window.localStorage.getItem(PREF_KEY);
      if (stored === 'off') engine.setEnabled(false);
      else engine.setEnabled(true);
    } catch { /* ignore */ }

    engine.play(scape);

    return () => {
      // Beim Verlassen des Moduls leiser werden — nicht hart abbrechen
      engine.stop();
    };
  }, [scape]);
}

/** Toggle-Hook für UI-Button — gibt aktuellen Zustand und Schalter zurück. */
export function useSoundToggle(): [boolean, () => void] {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PREF_KEY);
      setEnabled(stored !== 'off');
    } catch { /* ignore */ }
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    const engine = getSoundscape();
    engine.setEnabled(next);
    if (!next) engine.stop();
    try {
      window.localStorage.setItem(PREF_KEY, next ? 'on' : 'off');
    } catch { /* ignore */ }
  };

  return [enabled, toggle];
}
