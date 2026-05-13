/**
 * UI-PRIMITIVES
 * Wiederverwendbare Bausteine. Tailwind-Klassen.
 * Tippe-Targets ≥ 44px (iOS-Standard).
 */

'use client';

import { type ReactNode, type ButtonHTMLAttributes } from 'react';

/* ─── Tag — die kleinen mono-Beschriftungen ─────────────────────────── */
export function Tag({
  children,
  color = 'dim',
}: {
  children: ReactNode;
  color?: 'dim' | 'mute' | 'accent' | 'ember';
}) {
  const colorClass = {
    dim: 'text-ink-dim',
    mute: 'text-ink-mute',
    accent: 'text-accent',
    ember: 'text-ember',
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

/* ─── Rule — feine horizontale Linie ────────────────────────────────── */
export function Rule({ width = 56 }: { width?: number }) {
  return (
    <div
      className="h-px bg-line-hi animate-draw origin-left"
      style={{ width }}
    />
  );
}

/* ─── Btn — der Knopf ───────────────────────────────────────────────── */
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: 'primary' | 'secondary' | 'ember';
};

export function Btn({
  children,
  kind = 'primary',
  className = '',
  ...rest
}: BtnProps) {
  const styles = {
    primary:   'border-line-hi text-ink hover:border-accent hover:text-accent',
    secondary: 'border-line text-ink-dim hover:border-line-hi',
    ember:     'border-ember text-ember hover:bg-ember/10',
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

/* ─── Ghost — der leise Knopf (Abbrechen, Zurück) ────────────────────── */
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

/* ─── Stage — die zentrale Bühne ────────────────────────────────────── */
export function Stage({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 ${
        dark ? 'bg-bg-ink' : 'bg-bg'
      }`}
    >
      <div className="w-full max-w-[640px]">{children}</div>
    </div>
  );
}
