import type { Config } from 'tailwindcss';

/**
 * Mushin Designtokens
 * Eine einzige Wahrheit für Farben, Typografie und Bewegung.
 * Komponenten greifen hier zu — nicht auf Hex-Werte verteilt.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#0B0B0C',  // tiefes Anthrazit
        'bg-raise': '#111113', // angehoben (Karten)
        'bg-ink': '#08080A',   // Fokusmodus / Emergency
        line:     '#1F1F22',
        'line-hi':'#2A2A2E',
        ink:      '#E8E4DA',   // warmes Bone-White
        'ink-dim':'#8A8478',
        'ink-mute':'#4A463E',
        accent:   '#C9B98A',   // gebürstetes Messing
        ember:    '#B8533A',   // ausschließlich Reduktion / Emergency
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
        'rise':  'rise 900ms cubic-bezier(.2,.7,.2,1) both',
        'fade':  'fade 1200ms ease both',
        'draw':  'drawLine 1200ms cubic-bezier(.2,.7,.2,1) both',
      },
      keyframes: {
        rise:     { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fade:     { from: { opacity: '0' }, to: { opacity: '1' } },
        drawLine: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
    },
  },
  plugins: [],
};

export default config;
