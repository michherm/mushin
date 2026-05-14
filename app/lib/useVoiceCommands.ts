'use client';

/**
 * useVoiceCommands — Sprachsteuerung mit Web Speech API.
 *
 * Dauerhaftes Zuhören: einmal aktiviert, hört bis manuell beendet.
 * Erkennt feste Befehle (deutsch), ignoriert alles andere.
 *
 * Verwendung:
 *   const { active, supported, start, stop } = useVoiceCommands({
 *     onNext: () => setI(i + 1),
 *     onBack: () => setI(i - 1),
 *     onStop: () => {},
 *     onExit: () => onExit(),
 *   });
 *
 *   if (supported) {
 *     <button onClick={active ? stop : start}>{active ? '🎤' : '⏸'}</button>
 *   }
 *
 * Stabilität:
 *   - Bei Erkennungs-Aussetzer wird automatisch neu gestartet
 *   - Bei Tab-Wechsel bleibt das Mikrofon an, aber pausiert
 *   - Wird beim Unmount sauber beendet
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface SpeechRecognitionEvent extends Event {
  results: {
    length: number;
    [index: number]: {
      length: number;
      isFinal: boolean;
      [index: number]: { transcript: string; confidence: number };
    };
  };
  resultIndex: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type Commands = {
  onNext?: () => void;   // "weiter", "ja", "okay", "weiter so", "los"
  onBack?: () => void;   // "zurück", "stopp zurück"
  onStop?: () => void;   // "stopp", "pause", "halt", "warte"
  onExit?: () => void;   // "ende", "raus", "verlassen", "abbrechen"
};

// Erkennungs-Wörterbuch — wir bleiben großzügig, damit nicht jede Variante
// haargenau gesprochen sein muss. Reihenfolge: spezifischer zuerst.
const COMMAND_KEYWORDS: Array<{ keys: string[]; cmd: keyof Commands }> = [
  { keys: ['ende', 'raus', 'verlassen', 'abbrechen', 'beenden'], cmd: 'onExit' },
  { keys: ['zurück', 'zurueck', 'zurück gehen'], cmd: 'onBack' },
  { keys: ['stopp', 'stop', 'pause', 'halt', 'warte', 'warten'], cmd: 'onStop' },
  { keys: ['weiter', 'ja', 'okay', 'ok', 'jetzt', 'los'], cmd: 'onNext' },
];

function matchCommand(text: string): keyof Commands | null {
  const lower = text.toLowerCase().trim();
  for (const { keys, cmd } of COMMAND_KEYWORDS) {
    for (const key of keys) {
      // Exakte Übereinstimmung oder als ganzes Wort vorhanden
      if (lower === key) return cmd;
      const regex = new RegExp(`\\b${key}\\b`);
      if (regex.test(lower)) return cmd;
    }
  }
  return null;
}

export function useVoiceCommands(commands: Commands) {
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);
  const [lastHeard, setLastHeard] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const shouldBeActiveRef = useRef(false);
  const commandsRef = useRef(commands);

  // Aktuelle Commands in ref halten, damit Callback nicht stale wird
  useEffect(() => { commandsRef.current = commands; }, [commands]);

  // Browser-Support prüfen
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SR = (window as unknown as {
      SpeechRecognition?: new() => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new() => SpeechRecognitionInstance;
    });
    const Ctor = SR.SpeechRecognition || SR.webkitSpeechRecognition;
    setSupported(!!Ctor);
  }, []);

  const start = useCallback(() => {
    if (typeof window === 'undefined') return;
    const SR = (window as unknown as {
      SpeechRecognition?: new() => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new() => SpeechRecognitionInstance;
    });
    const Ctor = SR.SpeechRecognition || SR.webkitSpeechRecognition;
    if (!Ctor) {
      setError('Browser unterstützt keine Sprachsteuerung');
      return;
    }

    // Falls schon aktiv: nichts tun
    if (recognitionRef.current) return;

    try {
      const recognition = new Ctor();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'de-DE';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        // Nur das neueste finale Ergebnis prüfen
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (!result.isFinal) continue;
          const transcript = result[0].transcript;
          setLastHeard(transcript);

          const cmd = matchCommand(transcript);
          if (cmd && commandsRef.current[cmd]) {
            commandsRef.current[cmd]?.();
          }
        }
      };

      recognition.onerror = (event: Event) => {
        const errEvent = event as Event & { error?: string };
        // "no-speech" und "aborted" sind normal, nicht als Fehler werten
        if (errEvent.error && errEvent.error !== 'no-speech' && errEvent.error !== 'aborted') {
          setError(`Fehler: ${errEvent.error}`);
        }
      };

      recognition.onend = () => {
        // Browser stoppt automatisch nach Pausen — wir starten neu, wenn aktiv
        if (shouldBeActiveRef.current && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch {
            // Falls schon läuft, ignorieren
          }
        }
      };

      recognitionRef.current = recognition;
      shouldBeActiveRef.current = true;
      recognition.start();
      setActive(true);
      setError(null);
    } catch (e) {
      setError('Mikrofon konnte nicht aktiviert werden');
      console.error(e);
    }
  }, []);

  const stop = useCallback(() => {
    shouldBeActiveRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setActive(false);
    setLastHeard('');
  }, []);

  // Cleanup beim Unmount
  useEffect(() => {
    return () => {
      shouldBeActiveRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  return { active, supported, start, stop, lastHeard, error };
}
