/**
 * BreathOrb — der atmende Kreis.
 * Phasen: 'in' (4s expand), 'hold' (4s), 'out' (6s contract), 'idle'.
 */

'use client';

export type BreathPhase = 'in' | 'hold' | 'out' | 'idle';

export function BreathOrb({
  size = 220,
  phase = 'idle',
  label,
}: {
  size?: number;
  phase?: BreathPhase;
  label?: string;
}) {
  const phaseClass = {
    in: 'orb-inhale',
    hold: 'orb-hold',
    out: 'orb-exhale',
    idle: 'orb-idle',
  }[phase];

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      {/* Äußerer Ring — fest, "Struktur" */}
      <div
        className="absolute inset-0 border border-line rounded-full"
        aria-hidden
      />
      {/* Innerer Kreis — atmet */}
      <div
        className={`absolute border border-line-hi rounded-full ${phaseClass}`}
        style={{ inset: 22 }}
        aria-hidden
      />
      {/* Mittelpunkt */}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-1 -ml-0.5 -mt-0.5 bg-accent rotate-45"
        aria-hidden
      />
      {/* Phasen-Label */}
      {label && (
        <div className="absolute -bottom-7 left-0 right-0 text-center font-mono text-[10px] tracking-[0.3em] text-ink-dim uppercase animate-fade">
          {label}
        </div>
      )}
    </div>
  );
}
