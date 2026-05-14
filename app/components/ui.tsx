'use client';

/**
 * UI-PRIMITIVES — Version 3: Morgenwasser, brillenfreundlich
 *
 * Inter für alle UI-Texte (klar lesbar, auch klein).
 * Cormorant nur noch für die großen Display-Sätze (Headlines).
 * Stärkere Kontraste, größere Touch-Targets, mehr Luft.
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';

/* ─── Tag — kleine Beschriftung in Inter, gut lesbar ─────────────────── */
export function Tag({
  children,
  color = 'dim',
}: {
  children: ReactNode;
  color?: 'dim' | 'mute' | 'accent' | 'ember' | 'breath';
}) {
  const colorClass = {
    dim: 'text-ink-dim',
    mute: 'text-ink-mute',
    accent: 'text-accent',
    ember: 'text-ember',
    breath: 'text-breath',
  }[color];
  return (
    <span className={`font-ui font-semibold text-[11px] uppercase tracking-tag ${colorClass}`}>
      {children}
    </span>
  );
}

/* ─── Display — große Bühnensätze, Cormorant Regular ───────────────── */
export function Display({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`font-display font-normal leading-[1.1] tracking-[-0.01em] text-ink animate-rise ${className}`}
      style={{ fontSize: 'clamp(32px, 6vw, 56px)' }}
    >
      {children}
    </h1>
  );
}

/* ─── Rule — feine Linie ────────────────────────────────────────────── */
export function Rule({ width = 80 }: { width?: number }) {
  return (
    <div
      className="h-px animate-draw origin-left"
      style={{
        width,
        background: 'linear-gradient(90deg, transparent, #B4A88E, transparent)',
        opacity: 0.7,
      }}
    />
  );
}

/* ─── Btn — der Hauptknopf, größer, klarer ─────────────────────────── */
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: 'primary' | 'secondary' | 'ember' | 'breath';
};

export function Btn({
  children,
  kind = 'primary',
  className = '',
  ...rest
}: BtnProps) {
  const styles = {
    primary:   'border-accent text-accent bg-bg-raise hover:bg-accent hover:text-bg-raise',
    secondary: 'border-line-hi text-ink-dim bg-transparent hover:border-accent hover:text-accent hover:bg-bg-warm',
    ember:     'border-ember text-ember bg-bg-raise hover:bg-ember/10',
    breath:    'border-breath text-breath bg-bg-raise hover:bg-breath/10',
  }[kind];

  return (
    <button
      {...rest}
      className={[
        'border-[1.5px] font-ui font-semibold text-[13px] uppercase tracking-tag',
        'px-7 py-4 min-h-[52px] rounded-[10px]',
        'transition-all duration-[300ms] cubic-bezier(.2,.7,.2,1)',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        styles,
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}

/* ─── Ghost — der leise Knopf ─────────────────────────────────────── */
export function Ghost({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-transparent border-none text-ink-mute font-ui font-medium text-[12px] uppercase tracking-tag px-4 py-3 min-h-[44px] hover:text-ink-dim transition-colors"
    >
      {children}
    </button>
  );
}

/* ─── BoneCue — Cantienica-Hervorhebung ────────────────────────────── */
export function BoneCue({ children }: { children: ReactNode }) {
  return (
    <span className="bone-line text-accent font-medium">{children}</span>
  );
}

/* ─── Stage — die zentrale Bühne ────────────────────────────────── */
export function Stage({
  children,
  glow = true,
  glowColor = 'accent',
}: {
  children: ReactNode;
  glow?: boolean;
  glowColor?: 'accent' | 'breath' | 'ember';
}) {
  const glowColors = {
    accent: 'rgba(36, 77, 82, 0.10)',
    breath: 'rgba(94, 133, 144, 0.10)',
    ember:  'rgba(163, 84, 70, 0.08)',
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center text-center px-5 pt-20 pb-16 relative">
      {glow && (
        <>
          <div
            className="warm-glow pointer-events-none"
            style={{
              top: '15%', left: '50%', transform: 'translateX(-50%)',
              width: '60vw', height: '60vw', maxWidth: '600px', maxHeight: '600px',
              background: `radial-gradient(circle, ${glowColors[glowColor]} 0%, transparent 70%)`,
            }}
          />
          <div
            className="warm-glow pointer-events-none"
            style={{
              bottom: '5%', right: '5%',
              width: '40vw', height: '40vw', maxWidth: '400px', maxHeight: '400px',
              background: `radial-gradient(circle, ${glowColors[glowColor]} 0%, transparent 70%)`,
              animationDelay: '4s',
            }}
          />
        </>
      )}
      <div className="w-full max-w-[640px] relative z-10 my-auto">{children}</div>
    </div>
  );
}

/* ─── SoundToggle ────────────────────────────────────────────────── */
import { useSoundToggle } from '@/lib/useSoundscape';

export function SoundToggle() {
  const [enabled, toggle] = useSoundToggle();
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Klang aus' : 'Klang an'}
      className="fixed z-50 w-11 h-11 flex items-center justify-center rounded-full bg-bg-raise/90 backdrop-blur-sm border border-line text-ink-dim hover:text-accent hover:border-accent transition-all duration-300 shadow-sm"
      style={{
        top: 'calc(env(safe-area-inset-top, 0px) + 16px)',
        right: 'calc(env(safe-area-inset-right, 0px) + 16px)',
      }}
    >
      {enabled ? (
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <path d="M2 7 C2 4, 5 4, 5 7 C5 10, 2 10, 2 7" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M7 5 C7 5, 9 6, 9 7 C9 8, 7 9, 7 9" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7" />
          <path d="M10 3 C10 3, 13 5, 13 7 C13 9, 10 11, 10 11" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
          <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )}
    </button>
  );
}
