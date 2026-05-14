import type { Config } from 'tailwindcss';

/**
 * Mushin Designtokens — Version 3: Morgenwasser
 *
 * Skandinavisches Atelier, ruhiges Morgenlicht, Wasser, Schiefer.
 * Warmes Off-White, tiefes Petrol, gedämpftes Morgenblau.
 *
 * Inter für UI-Text (klar lesbar).
 * Cormorant für Display-Sätze (elegant).
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Hintergründe — warmes Off-White
        bg:         '#F7F5F2',  // Basis
        'bg-raise': '#FDFBF8',  // Karten, gehobene Flächen
        'bg-warm':  '#EDE8E0',  // sanfte Akzentfläche
        'bg-ink':   '#1F2A30',  // dunkler Fokus (Emergency)

        // Linien
        line:       '#D8CFC0',  // standard
        'line-hi':  '#B4A88E',  // bei Hover

        // Text
        ink:        '#1F2A30',  // Haupttext
        'ink-dim':  '#485861',  // gedämpft, aber gut lesbar
        'ink-mute': '#7C8A91',  // sehr leise

        // Akzente
        accent:     '#244D52',  // tiefes Petrol — Hauptakzent
        glow:       '#2F5D62',  // helleres Petrol
        breath:     '#5E8590',  // Morgenblau — Atem & Ruhe
        ember:      '#A35446',  // gedämpftes Terrakotta für Notfall
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        ui:      ['var(--font-ui)', 'system-ui', 'sans-serif'],
        // Behalte für Kompatibilität
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        mono:  ['var(--font-ui)', 'system-ui', 'monospace'],
      },
      letterSpacing: {
        'tag': '0.18em',
        'micro': '0.22em',
      },
      animation: {
        'rise':    'rise 900ms cubic-bezier(.2,.7,.2,1) both',
        'fade':    'fade 1200ms ease both',
        'draw':    'drawLine 1200ms cubic-bezier(.2,.7,.2,1) both',
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
