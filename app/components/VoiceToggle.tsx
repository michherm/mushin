'use client';

/**
 * VoiceToggle — kleiner Mikrofon-Knopf für die Sprachsteuerung.
 *
 * Drei Zustände:
 *   - nicht unterstützt: gar nicht angezeigt
 *   - aus: Mikrofon-Symbol mit Schrägstrich
 *   - aktiv: pulsierendes Mikrofon, leichter Glow
 */

interface VoiceToggleProps {
  active: boolean;
  onClick: () => void;
  lastHeard?: string;
}

export function VoiceToggle({ active, onClick, lastHeard }: VoiceToggleProps) {
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        aria-label={active ? 'Sprachsteuerung aus' : 'Sprachsteuerung an'}
        className={`
          relative w-12 h-12 flex items-center justify-center rounded-full
          border-[1.5px] transition-all duration-300
          ${active
            ? 'bg-accent/10 border-accent text-accent shadow-md'
            : 'bg-bg-raise border-line text-ink-mute hover:border-accent hover:text-accent shadow-sm'
          }
        `}
      >
        {/* Pulsieren wenn aktiv */}
        {active && (
          <div
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-accent animate-ping"
            style={{ animationDuration: '2s', opacity: 0.4 }}
          />
        )}

        {active ? (
          /* Mikrofon an */
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="6" y="2" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3.5 8.5 V 9.5 C 3.5 12.5, 6 14.5, 9 14.5 C 12 14.5, 14.5 12.5, 14.5 9.5 V 8.5"
                  stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <line x1="9" y1="14.5" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          /* Mikrofon aus */
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="6" y="2" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <path d="M3.5 8.5 V 9.5 C 3.5 12.5, 6 14.5, 9 14.5 C 12 14.5, 14.5 12.5, 14.5 9.5 V 8.5"
                  stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
            <line x1="9" y1="14.5" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Was zuletzt verstanden wurde — sehr klein, nur als Bestätigung */}
      {active && lastHeard && (
        <span className="font-ui text-[10px] text-ink-mute tracking-tag uppercase font-semibold animate-fade">
          {lastHeard.length > 20 ? '…' : lastHeard}
        </span>
      )}

      {/* Hilfetext nur wenn aktiv */}
      {active && (
        <span className="font-ui text-[10px] text-accent tracking-tag uppercase font-semibold opacity-70">
          "weiter" · "zurück" · "stopp"
        </span>
      )}
    </div>
  );
}
