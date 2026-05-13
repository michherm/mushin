/**
 * INTERVENTIONS-BIBLIOTHEK
 *
 * Das Vokabular des Sensei. Kuratiert, nicht generiert.
 * Pro Zustand mehrere Bausteine — Sensei wählt; vermeidet Wiederholung.
 *
 * Regel:
 *   - max. 3 Zeilen pro Intervention
 *   - Imperativ, kein "Ich denke, dass..."
 *   - immer ein körperlicher Anker, wenn möglich
 *   - "action" verweist auf ein Modul, das die KI vorschlägt (nicht erzwingt)
 *
 * Erweiterungen kommen hierhin — nicht in die Engine.
 */

export type Level = 'beginner' | 'cantienica';

export type ZustandsKey =
  | 'calm'          // klar, ruhig
  | 'activated'     // erregt, noch keine Spirale
  | 'rumination'    // kreisender Gedanke
  | 'spiral'        // eskalierende Schleife — ABBRUCH
  | 'dissociated'   // Verbindung zum Körper verloren
  | 'actionReady'   // bereit, aber unklar wohin
  | 'blocked';      // kann nicht handeln

export type ModulKey =
  | 'stand' | 'breath' | 'flow' | 'ground'
  | 'action' | 'emergency';

export interface Intervention {
  line1: string;
  line2?: string;
  action?: ModulKey | null;
  force?: boolean; // Spirale: KI bricht ab, push in Modul
}

type Bibliothek = Record<ZustandsKey, Record<Level, Intervention[]>>;

export const LIBRARY: Bibliothek = {

  /* ─── CALM ─────────────────────────────────────────────────────────── */
  calm: {
    beginner: [
      { line1: 'Du stehst.', line2: 'Halte das.' },
      { line1: 'Klarheit ist hier.', line2: 'Keine weitere Bewegung nötig.' },
      { line1: 'Genug.', line2: 'Schließ die App. Geh.' },
      { line1: 'Du brauchst Sensei nicht.', line2: 'Geh in den nächsten Schritt.' },
    ],
    cantienica: [
      { line1: 'Aufrichtung steht.', line2: 'Levator ani trägt. Bleib.' },
      { line1: 'Innere Länge ist da.', line2: 'Zwerchfell frei.' },
      { line1: 'Struktur hält.', line2: 'Geh in den Tag.' },
      { line1: 'Du bist im Lot.', line2: 'Verlass das Dojo.' },
    ],
  },

  /* ─── ACTIVATED ────────────────────────────────────────────────────── */
  activated: {
    beginner: [
      { line1: 'Atme.', line2: 'Vier ein. Sechs aus.', action: 'breath' },
      { line1: 'Spüre die Füße.', line2: 'Vier Punkte.', action: 'stand' },
      { line1: 'Schultern weich.', line2: 'Kiefer lösen. Mehr Raum im Brustkorb.' },
      { line1: 'Weniger Spannung.', line2: 'Mehr Geschwindigkeit. Lass sinken.' },
      { line1: 'Boden zuerst.', line2: 'Dann sortiert sich der Rest.', action: 'stand' },
    ],
    cantienica: [
      { line1: 'Zwerchfell senken.', line2: 'Sechs aus. In die Flanken.', action: 'breath' },
      { line1: 'Sitzbeinhöcker breit.', line2: 'Hinterkopf hoch.', action: 'stand' },
      { line1: 'Kehlkopf weich.', line2: 'Levator ani sanft halten.' },
      { line1: 'Fußgewölbe aufrichten.', line2: 'Becken im Lot.', action: 'stand' },
      { line1: 'Raum zwischen den Wirbeln.', line2: 'Atem schwingt durch.' },
    ],
  },

  /* ─── RUMINATION ───────────────────────────────────────────────────── */
  rumination: {
    beginner: [
      { line1: 'Das ist nur ein Gedanke.', line2: 'Er bewegt sich nicht. Du musst es auch nicht.' },
      { line1: 'Du musst ihn nicht beantworten.', line2: 'Lass ihn durchziehen.', action: 'flow' },
      { line1: 'Weniger Widerstand.', line2: 'Mehr Raum.' },
      { line1: 'Du denkst denselben Gedanken erneut.', line2: 'Das ist nicht Denken. Das ist Wiederholung.' },
      { line1: 'Nicht analysieren.', line2: 'Atmen.', action: 'breath' },
      { line1: 'Der Gedanke will dich.', line2: 'Du musst nicht antworten.', action: 'flow' },
    ],
    cantienica: [
      { line1: 'Der Gedanke ist nicht die Struktur.', line2: 'Du bist die Struktur.' },
      { line1: 'Innere Länge zuerst.', line2: 'Der Gedanke verliert Gewicht.', action: 'stand' },
      { line1: 'Zwerchfell weit.', line2: 'Spirale verliert ihren Boden.', action: 'breath' },
      { line1: 'Aus dem Lot heraus betrachten.', line2: 'Nicht aus dem Gedanken.', action: 'stand' },
    ],
  },

  /* ─── SPIRAL ───────────────────────────────────────────────────────── */
  spiral: {
    beginner: [
      { line1: 'Stopp.', line2: 'Wir analysieren nicht weiter. Stand. Atem. Ein Schritt.', action: 'emergency', force: true },
      { line1: 'Genug.', line2: 'Erst Körper. Dann Denken.', action: 'emergency', force: true },
      { line1: 'Schluss.', line2: 'Du drehst dich. Raus aus dem Kopf.', action: 'emergency', force: true },
    ],
    cantienica: [
      { line1: 'Stopp.', line2: 'Becken aufrichten. Levator ani. Sechs aus.', action: 'emergency', force: true },
      { line1: 'Genug.', line2: 'Aufspannung zuerst. Gedanken verlieren Halt.', action: 'emergency', force: true },
      { line1: 'Schluss.', line2: 'Knochen zurück ins Lot. Alles andere wartet.', action: 'emergency', force: true },
    ],
  },

  /* ─── DISSOCIATED ──────────────────────────────────────────────────── */
  dissociated: {
    beginner: [
      { line1: 'Spüre den Boden.', line2: 'Was siehst du? Fünf Dinge.', action: 'ground' },
      { line1: 'Hände auf den Brustkorb.', line2: 'Atme dort hinein.' },
      { line1: 'Komm zurück.', line2: 'Füße. Boden. Atem.', action: 'ground' },
      { line1: 'Wo bist du jetzt?', line2: 'Nicht in Gedanken. Im Raum.', action: 'ground' },
    ],
    cantienica: [
      { line1: 'Fußgewölbe spüren.', line2: 'Großzeh, Kleinzeh, beide Fersen.', action: 'stand' },
      { line1: 'Knochen zurück ins Lot.', line2: 'Von unten nach oben aufbauen.', action: 'stand' },
      { line1: 'Sitzbeinhöcker auf dem Boden.', line2: 'Wirbel für Wirbel zurück.' },
      { line1: 'Spür den Levator ani.', line2: 'Sanft. Du bist hier.' },
    ],
  },

  /* ─── ACTION-READY ─────────────────────────────────────────────────── */
  actionReady: {
    beginner: [
      { line1: 'Was ist jetzt real?', line2: 'Eine Bewegung. Konkret. Klein.', action: 'action' },
      { line1: 'Der nächste Schritt — nicht der Plan.', line2: 'Nur der nächste.', action: 'action' },
      { line1: 'Mach eins.', line2: 'Nicht alles. Eins.', action: 'action' },
      { line1: 'Jetzt.', line2: 'Was in zwei Minuten getan werden kann.', action: 'action' },
    ],
    cantienica: [
      { line1: 'Aus der Mitte handeln.', line2: 'Ein direkter Schritt.', action: 'action' },
      { line1: 'Aufgerichtet entscheiden.', line2: 'Erst Struktur, dann Bewegung.', action: 'action' },
      { line1: 'Keine unnötige Spannung.', line2: 'Direkte Linie zum Schritt.', action: 'action' },
    ],
  },

  /* ─── BLOCKED ──────────────────────────────────────────────────────── */
  blocked: {
    beginner: [
      { line1: 'Du musst es nicht entscheiden.', line2: 'Nur die nächste Sekunde tun.' },
      { line1: 'Stand zuerst.', line2: 'Entscheidung später.', action: 'stand' },
      { line1: 'Du bist nicht festgefahren.', line2: 'Du bist nur verkrampft.', action: 'stand' },
      { line1: 'Atme tief.', line2: 'Der Weg zeigt sich. Aber nicht durch Denken.', action: 'breath' },
    ],
    cantienica: [
      { line1: 'Erst die Struktur.', line2: 'Dann zeigt sich der Weg.', action: 'stand' },
      { line1: 'Spannung blockiert.', line2: 'Lös den Kiefer. Senk das Zwerchfell.', action: 'breath' },
      { line1: 'Aufrichten, nicht entscheiden.', line2: 'Die Klarheit kommt von selbst.', action: 'stand' },
    ],
  },
};

/**
 * Erweiterungs-Pattern für später:
 *   import { LIBRARY } from './library';
 *   LIBRARY.rumination.cantienica.push({ line1: '...', line2: '...' });
 *
 * Oder neuen Zustand hinzufügen: erst Type erweitern, dann classify() ergänzen.
 */
