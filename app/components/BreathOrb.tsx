'use client';

export type BreathPhase = 'in' | 'hold' | 'out' | 'idle';

export function BreathOrb({
  size = 220,
  phase = 'idle',
  label,
  color = 'accent',
}: {
  size?: number;
  phase?: BreathPhase;
  label?: string;
  color?: 'accent' | 'breath' | 'ember';
}) {
  const phaseClass = {
    in: 'orb-inhale',
    hold: 'orb-hold',
    out: 'orb-exhale',
    idle: 'orb-idle',
  }[phase];

  // Morgenwasser-Töne: Petrol, Morgenblau, Terrakotta
  const tones = {
    accent: { ring: '#D8CFC0', ringHi: '#B4A88E', dot: '#244D52', glow: 'rgba(36, 77, 82, 0.18)' },
    breath: { ring: '#D8CFC0', ringHi: '#9AAFB8', dot: '#5E8590', glow: 'rgba(94, 133, 144, 0.18)' },
    ember:  { ring: '#E8D5CE', ringHi: '#C99A8C', dot: '#A35446', glow: 'rgba(163, 84, 70, 0.20)' },
  }[color];

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at center, ${tones.glow} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          transform: phase === 'in' ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 4000ms cubic-bezier(.4,.1,.4,1)',
        }}
      />

      <div
        className="absolute inset-0 rounded-full"
        style={{ border: `1.5px solid ${tones.ring}` }}
        aria-hidden
      />

      <div
        className={`absolute rounded-full ${phaseClass}`}
        style={{ inset: 22, border: `1.5px solid ${tones.ringHi}` }}
        aria-hidden
      />

      <div
        className="absolute rounded-full"
        style={{
          inset: '40%',
          background: `radial-gradient(circle, ${tones.glow} 0%, transparent 60%)`,
          transform: phase === 'in' ? 'scale(1.3)' : phase === 'out' ? 'scale(0.7)' : 'scale(1)',
          transition: 'transform 5000ms cubic-bezier(.4,.1,.4,1)',
        }}
        aria-hidden
      />

      <div
        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rotate-45"
        style={{ background: tones.dot, boxShadow: `0 0 12px ${tones.dot}` }}
        aria-hidden
      />

      {label && (
        <div className="absolute -bottom-7 left-0 right-0 text-center font-ui text-[11px] font-semibold tracking-[0.22em] uppercase animate-fade"
             style={{ color: '#7C8A91' }}>
          {label}
        </div>
      )}
    </div>
  );
}
