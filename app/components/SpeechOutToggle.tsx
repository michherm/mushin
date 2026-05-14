'use client';

/**
 * Fixer Lautsprecher-Knopf: Übungen und Anweisungen vorlesen (de-DE).
 * Nur sichtbar, wenn der Browser speechSynthesis unterstützt.
 */

import { useSpeechOutput } from '@/lib/SpeechOutputContext';

export function SpeechOutToggle() {
  const { supported, enabled, toggle } = useSpeechOutput();

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? 'Vorlesen aus' : 'Vorlesen an'}
      title={enabled ? 'Vorlesen aus' : 'Übungen vorlesen'}
      className="fixed z-50 w-11 h-11 flex items-center justify-center rounded-full bg-bg-raise/90 backdrop-blur-sm border border-line text-ink-dim hover:text-accent hover:border-accent transition-all duration-300 shadow-sm"
      style={{
        top: 'calc(env(safe-area-inset-top, 0px) + 16px)',
        right: 'calc(env(safe-area-inset-right, 0px) + 70px)',
      }}
    >
      {enabled ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4L8 7H5v10h3l4 3V4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M15 9c1.5 1.2 1.5 4.8 0 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M17.5 7c2.5 2 2.5 8 0 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4L8 7H5v10h3l4 3V4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
            opacity="0.45"
          />
          <line
            x1="3"
            y1="3"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
