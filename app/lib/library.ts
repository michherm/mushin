/**
 * INTERVENTIONS-BIBLIOTHEK
 *
 * Das Vokabular des Sensei. Kuratiert, nicht generiert.
 *
 * Cantienica-Bausteine nutzen authentische Methoden-Sprache:
 *   - Kronenpunkt, Sitzbeinhöcker, Levator ani, Zwerchfell
 *   - Autochthone Muskulatur, Schambein, Steißbein, Kreuzbein
 *   - "Langdenken", "Aufspannung", "diagonal beatmen"
 *   - "In die Aufspannung entspannen"
 *   - Bilder: Knochen langziehen, Klettverschlüsse, Wolken unter den Fersen
 *
 * Beginner-Bausteine arbeiten mit einfacherer Sprache, gleicher Substanz.
 *
 * Regel:
 *   - max. 3 Zeilen pro Intervention (line1, line2, line3)
 *   - Imperativ, keine Therapie-Sprache
 *   - Körperanker bevorzugt anatomisch präzise
 *   - "action" verweist auf ein Modul (Vorschlag, nicht Zwang)
 *   - "force: true" bei Spirale → Push in Reduktion
 */

export type Level = 'beginner' | 'cantienica';

export type ZustandsKey =
  | 'calm' | 'activated' | 'rumination' | 'spiral'
  | 'dissociated' | 'actionReady' | 'blocked';

export type ModulKey =
  | 'stand' | 'breath' | 'flow' | 'ground'
  | 'action' | 'emergency' | 'aufspannung';

export interface Intervention {
  line1: string;
  line2?: string;
  line3?: string;
  action?: ModulKey | null;
  force?: boolean;
}

type Bibliothek = Record<ZustandsKey, Record<Level, Intervention[]>>;

export const LIBRARY: Bibliothek = {

  /* ═══════════════════════════════════════════════════════════════════
     CALM — du bist klar. KI greift minimal ein.
     ═══════════════════════════════════════════════════════════════════ */
  calm: {
    beginner: [
      { line1: 'Du stehst.', line2: 'Halte das.' },
      { line1: 'Klarheit ist hier.', line2: 'Keine weitere Bewegung nötig.' },
      { line1: 'Genug.', line2: 'Schließ die App. Geh in den nächsten Schritt.' },
      { line1: 'Du brauchst Sensei nicht.', line2: 'Vertrau dem.' },
    ],
    cantienica: [
      { line1: 'Aufspannung steht.', line2: 'Kronenpunkt zur Decke. Bleib.' },
      { line1: 'Ferse zu Krone — die Linie ist da.', line2: 'Verlass das Dojo.' },
      { line1: 'Innere Länge trägt dich.', line2: 'Geh in den Tag.' },
      { line1: 'Du bist im Lot.', line2: 'Levator ani sanft. Zwerchfell frei. Genug.' },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     ACTIVATED — leicht erregt, noch keine Spirale
     ═══════════════════════════════════════════════════════════════════ */
  activated: {
    beginner: [
      { line1: 'Atme.', line2: 'Vier ein. Sechs aus.', action: 'breath' },
      { line1: 'Spüre die Füße.', line2: 'Vier Punkte unter jedem Fuß.', action: 'stand' },
      { line1: 'Schultern weich.', line2: 'Kiefer lösen. Mehr Raum.' },
      { line1: 'Weniger Spannung.', line2: 'Mehr Geschwindigkeit. Lass sinken.' },
      { line1: 'Boden zuerst.', line2: 'Dann sortiert sich der Rest.', action: 'stand' },
      { line1: 'Zunge an den Gaumen.', line2: 'Mund leicht offen. Kiefer weich.' },
    ],
    cantienica: [
      { line1: 'Zwerchfell senken.', line2: 'Sechs aus. In die Flanken atmen.', action: 'breath' },
      { line1: 'Sitzbeinhöcker breit.', line2: 'Kronenpunkt zur Decke.', action: 'aufspannung' },
      { line1: 'Kehlkopf weich.', line2: 'Levator ani sanft halten. Schulterblätter tief, flach, weit.' },
      { line1: 'Fußgewölbe aufrichten.', line2: 'Vier Wolken unter jedem Fuß. Becken im Lot.', action: 'stand' },
      { line1: 'Knochen langdenken.', line2: 'Wirbelsäule aufspannen. Die Spannung folgt.', action: 'aufspannung' },
      { line1: 'Schambein und Steißbein in die Tiefe.', line2: 'Kreuzbein zum Kronenpunkt. Atem schwingt durch.' },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     RUMINATION — kreisender Gedanke
     ═══════════════════════════════════════════════════════════════════ */
  rumination: {
    beginner: [
      { line1: 'Das ist nur ein Gedanke.', line2: 'Er bewegt sich nicht. Du musst es auch nicht.' },
      { line1: 'Du musst ihn nicht beantworten.', line2: 'Lass ihn durchziehen.', action: 'flow' },
      { line1: 'Weniger Widerstand.', line2: 'Mehr Raum. Lass los.' },
      { line1: 'Du denkst denselben Gedanken erneut.', line2: 'Das ist nicht Denken. Das ist Wiederholung.' },
      { line1: 'Nicht analysieren.', line2: 'Atmen. Vier ein, sechs aus.', action: 'breath' },
      { line1: 'Der Gedanke will dich.', line2: 'Du musst nicht antworten.', action: 'flow' },
      { line1: 'Stand zuerst.', line2: 'Der Gedanke verliert dann sein Gewicht.', action: 'stand' },
    ],
    cantienica: [
      { line1: 'Der Gedanke ist nicht die Struktur.', line2: 'Du bist die Struktur.' },
      { line1: 'Innere Länge zuerst.', line2: 'Kronenpunkt zur Decke. Der Gedanke verliert Halt.', action: 'aufspannung' },
      { line1: 'Zwerchfell weit.', line2: 'Diagonal beatmen. Linker Sitzbeinhöcker ein, rechte Schulter aus.', action: 'breath' },
      { line1: 'Aus dem Lot betrachten.', line2: 'Nicht aus dem Gedanken. Aufspannung trägt.', action: 'stand' },
      { line1: 'Knochen langdenken.', line2: 'Levator ani sanft. Der Kreis stoppt von selbst.' },
      { line1: 'Vorderseite, Rückseite, gleiche Länge.', line2: 'Wie zwei Klettverschlüsse. Innen wird ruhig.' },
      { line1: 'In die Aufspannung entspannen.', line2: 'Nicht gegen den Gedanken. Mit der Struktur.', action: 'aufspannung' },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     SPIRAL — eskalierende Schleife. ABBRUCH.
     ═══════════════════════════════════════════════════════════════════ */
  spiral: {
    beginner: [
      { line1: 'Stopp.', line2: 'Wir analysieren nicht. Stand. Atem. Ein Schritt.', action: 'emergency', force: true },
      { line1: 'Genug.', line2: 'Erst Körper. Dann Denken.', action: 'emergency', force: true },
      { line1: 'Schluss.', line2: 'Du drehst dich. Raus aus dem Kopf.', action: 'emergency', force: true },
    ],
    cantienica: [
      { line1: 'Stopp.', line2: 'Sitzbeinhöcker zueinander. Levator ani. Sechs aus.', action: 'emergency', force: true },
      { line1: 'Genug.', line2: 'Aufspannung zuerst. Kronenpunkt zur Decke. Atem in die Flanken.', action: 'emergency', force: true },
      { line1: 'Schluss.', line2: 'Knochen zurück ins Lot. Alles andere wartet.', action: 'emergency', force: true },
      { line1: 'Halt.', line2: 'Vier Wolken unter den Fersen. Steißbein in die Tiefe. Krone hoch.', action: 'emergency', force: true },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     DISSOCIATED — Verbindung zum Körper verloren
     ═══════════════════════════════════════════════════════════════════ */
  dissociated: {
    beginner: [
      { line1: 'Spüre den Boden.', line2: 'Was siehst du? Fünf Dinge.', action: 'ground' },
      { line1: 'Hände auf den Brustkorb.', line2: 'Atme dort hinein.' },
      { line1: 'Komm zurück.', line2: 'Füße. Boden. Atem.', action: 'ground' },
      { line1: 'Wo bist du jetzt?', line2: 'Nicht in Gedanken. Im Raum.', action: 'ground' },
    ],
    cantienica: [
      { line1: 'Fußgewölbe spüren.', line2: 'Großzeh, Kleinzeh, Ferse innen, Ferse außen.', action: 'stand' },
      { line1: 'Knochen zurück ins Lot.', line2: 'Von Ferse bis Kronenpunkt. Von unten aufbauen.', action: 'stand' },
      { line1: 'Sitzbeinhöcker auf der Unterlage.', line2: 'Wirbel für Wirbel zurück. Du bist hier.' },
      { line1: 'Levator ani sanft aktivieren.', line2: 'Innen anwesend werden. Atem schwingt durch.' },
      { line1: 'Wolken unter den Fersen.', line2: 'Großzehengrundgelenk ansaugen. Der Boden trägt.', action: 'stand' },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     ACTION-READY — bereit, sucht den Schritt
     ═══════════════════════════════════════════════════════════════════ */
  actionReady: {
    beginner: [
      { line1: 'Was ist jetzt real?', line2: 'Eine Bewegung. Konkret. Klein.', action: 'action' },
      { line1: 'Der nächste Schritt — nicht der Plan.', line2: 'Nur der nächste.', action: 'action' },
      { line1: 'Mach eins.', line2: 'Nicht alles. Eins.', action: 'action' },
      { line1: 'Jetzt.', line2: 'Was in zwei Minuten getan werden kann.', action: 'action' },
    ],
    cantienica: [
      { line1: 'Aus der Mitte handeln.', line2: 'Becken im Lot. Ein direkter Schritt.', action: 'action' },
      { line1: 'Aufgespannt entscheiden.', line2: 'Kronenpunkt hoch. Erst Struktur, dann Bewegung.', action: 'action' },
      { line1: 'Keine unnötige Spannung.', line2: 'Direkte Linie aus dem Levator ani zum Schritt.', action: 'action' },
      { line1: 'Knochen langdenken — dann handeln.', line2: 'Die Klarheit ist schon in der Aufspannung.', action: 'action' },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     BLOCKED — festgefahren
     ═══════════════════════════════════════════════════════════════════ */
  blocked: {
    beginner: [
      { line1: 'Du musst es nicht entscheiden.', line2: 'Nur die nächste Sekunde tun.' },
      { line1: 'Stand zuerst.', line2: 'Entscheidung später.', action: 'stand' },
      { line1: 'Du bist nicht festgefahren.', line2: 'Du bist nur verkrampft.', action: 'stand' },
      { line1: 'Atme tief.', line2: 'Der Weg zeigt sich. Nicht durch Denken.', action: 'breath' },
    ],
    cantienica: [
      { line1: 'Erst die Aufspannung.', line2: 'Dann zeigt sich der Weg. Kronenpunkt hoch.', action: 'aufspannung' },
      { line1: 'Spannung blockiert.', line2: 'Lös den Kiefer. Senk das Zwerchfell. Sitzbeinhöcker breit.', action: 'breath' },
      { line1: 'Aufrichten, nicht entscheiden.', line2: 'Die Klarheit kommt aus der Struktur, nicht aus dem Kopf.', action: 'stand' },
      { line1: 'In die Aufspannung entspannen.', line2: 'Aktiv. Nicht warten — ausrichten.', action: 'aufspannung' },
    ],
  },
};
