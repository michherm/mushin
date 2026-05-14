'use client';

/**
 * Vorlesen (TTS) über die Web Speech API.
 * Sprache: de-DE. Toggle wird in localStorage gehalten.
 *
 * Hinweis: Manche Mobile-Browser erwarten eine Nutzerinteraktion bevor
 * die erste Ausgabe startet — einmal den Lautsprecher aktivieren reicht oft.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'mushin.speechOut.v1';

type SpeechOutputValue = {
  supported: boolean;
  enabled: boolean;
  setEnabled: (on: boolean) => void;
  toggle: () => void;
  speak: (text: string) => void;
  stop: () => void;
};

const SpeechOutputContext = createContext<SpeechOutputValue | null>(null);

function readStored(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeStored(on: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
  } catch {
    /* ignore */
  }
}

export function SpeechOutputProvider({ children }: { children: ReactNode }) {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabledState] = useState(false);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupported(typeof window.speechSynthesis !== 'undefined');
    setEnabledState(readStored());
  }, []);

  const setEnabled = useCallback((on: boolean) => {
    setEnabledState(on);
    writeStored(on);
    if (!on && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabledState(prev => {
      const next = !prev;
      writeStored(next);
      if (!next && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (!enabledRef.current) return;
    const t = text.replace(/\s+/g, ' ').trim();
    if (!t) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'de-DE';
    u.rate = 0.9;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  }, []);

  const value = useMemo(
    (): SpeechOutputValue => ({
      supported,
      enabled,
      setEnabled,
      toggle,
      speak,
      stop,
    }),
    [supported, enabled, setEnabled, toggle, speak, stop],
  );

  useEffect(() => () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return (
    <SpeechOutputContext.Provider value={value}>
      {children}
    </SpeechOutputContext.Provider>
  );
}

export function useSpeechOutput(): SpeechOutputValue {
  const ctx = useContext(SpeechOutputContext);
  if (!ctx) {
    throw new Error('useSpeechOutput muss innerhalb von SpeechOutputProvider verwendet werden');
  }
  return ctx;
}

/** Vorlesen nur wenn global eingeschaltet und unterstützt. */
export function useAnnounceExercise(text: string, versionKey: string | number) {
  const { enabled, supported, speak } = useSpeechOutput();

  useEffect(() => {
    if (!supported || !enabled) return;
    const t = text.replace(/\s+/g, ' ').trim();
    if (!t) return;
    speak(t);
  }, [versionKey, enabled, supported, speak, text]);
}
