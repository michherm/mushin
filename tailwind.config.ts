import type { Config } from 'tailwindcss';

/**
 * Mushin Designtokens — Version 2 (wärmer, lebendiger)
 *
 * Vorher: kühles Anthrazit (#0B0B0C), kaltes Bone (#E8E4DA)
 * Jetzt:  warmes Anthrazit mit Braununterton, lebendigeres Bone,
 *         ein zusätzlicher Glut-Ton für Wärme, ein Atem-Ton für Bewegung.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Hintergründe — warmes Anthrazit, kein kaltes Grau
        bg:       '#0F0D0B',  // Basis: Schwarz mit Braun-Unterton
        'bg-raise': '#15110E', // angehoben (Karten)
        'bg-warm': '#1A1612',  // warme Karten (Sensei, Aufspannung)
        'bg-ink': '#0A0907',   // tiefer Fokus / Emergency

        // Linien — wärmere Trennlinien
        line:     '#2A2218',
        'line-hi':'#3A2F22',

        // Text — wärmeres Bone-White
        ink:      '#F0E8D9',   // hellerer, lebendigerer Bone-Ton
        'ink-dim':'#9A8E78',
        'ink-mute':'#5A4F3E',

        // Akzente — die Farben des Dojos
        accent:   '#D9BE85',   // gebürstetes Messing, wärmer und tiefer
        glow:     '#E8C470',   // Glut — bei Übergängen, Highlights
        breath:   '#7DA89C',   // sanftes Salbei — Atem & Ruhe
        ember:    '#C44A2E',   // Reduktion / Emergency
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        mono:  ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'tag': '0.22em',
        'micro': '0.32em',
      },
      animation: {
        'rise':    'rise 900ms cubic-bezier(.2,.7,.2,1) both',
        'fade':    'fade 1200ms ease both',
        'draw':    'drawLine 1200ms cubic-bezier(.2,.7,.2,1) both',
        'breathe': 'bgBreathe 12s ease-in-out infinite',
        'glow':    'glowPulse 4s ease-in-out infinite',
        'warm':    'warmShift 20s ease-in-out infinite',
      },
      keyframes: {
        rise:       { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fade:       { from: { opacity: '0' }, to: { opacity: '1' } },
        drawLine:   { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        bgBreathe:  {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.05)' },
        },
        glowPulse:  {
          '0%, 100%': { opacity: '0.7' },
          '50%':      { opacity: '1' },
        },
        warmShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
