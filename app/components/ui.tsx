'use client';

/**
 * UI-PRIMITIVES — wärmer, lebendiger.
 *
 * Bühne hat jetzt einen sanften warmen Glow im Hintergrund,
 * der sich wie ein Kerzenschein bewegt.
 *
 * Buttons haben mehr Tiefe, sind aber immer noch reduziert.
 *
 * Neu: BoneCue — für Cantienica-Knochenanker, hauchzart unterstrichen.
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';

/* ─── Tag — die kleinen mono-Beschriftungen ─────────────────────────── */
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
    <span className={`font-mono text-[10px] uppercase tracking-tag ${colorClass}`}>
      {children}
    </span>
  );
}

/* ─── Display — die Bühnenstimme ────────────────────────────────────── */
export function Display({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`font-serif font-light leading-[1.06] tracking-[-0.012em] text-ink animate-rise ${className}`}
      style={{ fontSize: 'clamp(36px, 7vw, 64px)' }}
    >
      {children}
    </h1>
  );
}

/* ─── Rule — feine horizontale Linie mit warmer Mitte ───────────────── */
export function Rule({ width = 56 }: { width?: number }) {
  return (
    <div
      className="h-px animate-draw origin-left"
      style={{
        width,
        background: 'linear-gradient(90deg, transparent, #D9BE85, transparent)',
        opacity: 0.5,
      }}
    />
  );
}

/* ─── Btn — der Knopf, wärmer ────────────────────────────────────────── */
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
    primary:   'border-line-hi text-ink hover:border-accent hover:text-accent hover:bg-bg-warm/40',
    secondary: 'border-line text-ink-dim hover:border-line-hi hover:text-ink',
    ember:     'border-ember text-ember hover:bg-ember/10',
    breath:    'border-breath/50 text-breath hover:bg-breath/10',
  }[kind];

  return (
    <button
      {...rest}
      className={[
        'border bg-transparent font-mono text-[11px] uppercase tracking-tag',
        'px-7 py-4 min-h-[48px]',
        'transition-all duration-[400ms] [transition-timing-function:cubic-bezier(.2,.7,.2,1)]',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        styles,
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}

/* ─── Ghost — der leise Knopf ─────────────────────────────────────────── */
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
      className="bg-transparent border-none text-ink-mute font-mono text-[10px] uppercase tracking-tag p-4 min-h-[44px] hover:text-ink-dim transition-colors"
    >
      {children}
    </button>
  );
}

/* ─── BoneCue — Cantienica-Hervorhebung für Knochen-Anker ────────────── */
/* Hauchzartes Highlight, das wie ein Lichtschein über den Knochen-Begriff zieht.
   Benutzt das gleiche Vokabular wie Isabelle. */
export function BoneCue({ children }: { children: ReactNode }) {
  return (
    <span className="bone-line text-accent">{children}</span>
  );
}

/* ─── Stage — die zentrale Bühne mit warmem Glühen ───────────────────── */
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
    accent: 'rgba(217, 190, 133, 0.15)',
    breath: 'rgba(125, 168, 156, 0.15)',
    ember:  'rgba(196, 74, 46, 0.10)',
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">
      {glow && (
        <>
          <div
            className="warm-glow"
            style={{
              top: '15%', left: '50%', transform: 'translateX(-50%)',
              width: '60vw', height: '60vw',
              background: `radial-gradient(circle, ${glowColors[glowColor]} 0%, transparent 70%)`,
            }}
          />
          <div
            className="warm-glow"
            style={{
              bottom: '5%', right: '5%',
              width: '40vw', height: '40vw',
              background: `radial-gradient(circle, ${glowColors[glowColor]} 0%, transparent 70%)`,
              animationDelay: '4s',
            }}
          />
        </>
      )}
      <div className="w-full max-w-[640px] relative z-10">{children}</div>
    </div>
  );
}

/* ─── SoundToggle — kleines Klang-an/aus-Knöpfchen für die Ecke ────── */
import { useSoundToggle } from '@/lib/useSoundscape';

export function SoundToggle() {
  const [enabled, toggle] = useSoundToggle();
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Klang aus' : 'Klang an'}
      className="fixed top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-bg-warm/60 backdrop-blur-sm border border-line text-ink-dim hover:text-accent hover:border-accent transition-all duration-300"
    >
      {enabled ? (
        /* Klang an: drei kleine geschwungene Wellen */
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7 C2 4, 5 4, 5 7 C5 10, 2 10, 2 7" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M7 5 C7 5, 9 6, 9 7 C9 8, 7 9, 7 9" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
          <path d="M10 3 C10 3, 13 5, 13 7 C13 9, 10 11, 10 11" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
        </svg>
      ) : (
        /* Klang aus: durchgestrichener Punkt */
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
          <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1" />
        </svg>
      )}
    </button>
  );
}
