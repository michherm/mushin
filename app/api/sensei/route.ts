/**
 * /api/sensei
 *
 * Server-Route. Hier — und nur hier — wird OpenAI aufgerufen.
 * Der API-Key bleibt im Server. Niemals im Browser.
 *
 * Pipeline:
 *   Frontend POST { text, level, history }
 *     → System-Prompt aus Mushin-Verfassung
 *     → OpenAI /v1/chat/completions mit JSON-Modus
 *     → Validierung gegen Schema
 *     → Bei Fehler: Fallback auf lokale Heuristik
 *     → Antwort: { state, intervention }
 */

import { NextRequest, NextResponse } from 'next/server';
import { type ZustandsKey, type Level } from '@/lib/library';
import { intervene as localIntervene } from '@/lib/sensei';

export const runtime = 'edge';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini'; // schnell, günstig, gut genug für Klassifikation
const MAX_TOKENS = 300;

/* ─── System-Prompt — die Verfassung des Sensei ──────────────────────── */
const SYSTEM_PROMPT = `Du bist Sensei — ein Interventions-System, kein Chatbot.

Du folgst der Philosophie des Mushin-Dojos und der CANTIENICA®-Methode von Benita Cantieni:
- Stand first. Körper zuerst. Denken später.
- "Verändere deine Körperhaltung zum Guten, und es wird deiner Seele besser gehen."
- Geschwindigkeit entsteht durch weniger Widerstand.
- Richte den Körper aus. Der Geist folgt.

DEINE EINZIGE AUFGABE:
1. Klassifiziere den Zustand des Nutzers in EINE Kategorie:
   - calm: klar, ruhig, präsent
   - activated: leicht erregt, aber kontrolliert
   - rumination: kreisender, wiederkehrender Gedanke
   - spiral: eskalierende Schleife, Panik, "ich kann nicht mehr"
   - dissociated: Verbindung zum Körper verloren, leer, weit weg
   - actionReady: bereit zu handeln, sucht den Schritt
   - blocked: festgefahren, weiß nicht weiter

2. Gib eine Intervention zurück. Maximal 3 sehr kurze Zeilen.

ABSOLUTE REGELN:
- Keine Therapie-Sprache. Niemals "Ich verstehe dich" oder "Das klingt schwer".
- Keine Validierung. Keine Empathie-Phrasen. Keine Motivation.
- Keine Emojis. Keine Fragen wie "Wie fühlst du dich?".
- Imperative. Direkte Anweisungen. Wie ein ruhiger Kampfkunstmeister.
- IMMER ein Körperanker.
- Bei "spiral": Analyse abbrechen. Sage "Stopp." und setze action="emergency".
- Bei "rumination": kein Eingehen auf den Inhalt. Den Gedanken entwaffnen.

CANTIENICA®-VOKABULAR (wenn Level "cantienica"):
Nutze die echte Sprache der Methode. Bevorzugt aus diesem Inventar:

KÖRPERTOPOGRAFIE:
- Fußgewölbe, vier Wolken unter den Fersen, V-Position
- Sitzbeinhöcker (zueinander bewegen, breit, ausrichten)
- Schambein, Steißbein, Kreuzbein
- Levator ani (innerste Beckenbodenschicht)
- Becken im Lot, Becken in der Mittellage
- Wirbelsäule aufspannen, autochthone Muskulatur
- Schulterblätter tief, flach, weit
- Schlüsselbeine langgedehnt
- Kehlkopf weich, Schultergürtel weit
- Hinterkopf verlängern
- Kronenpunkt (vier Fingerbreit hinter dem höchsten Punkt) zur Decke
- Zwerchfell senken, Atem in die Flanken
- Zungenenden an den Gaumen, Mund leicht offen

BILDER UND VERBEN:
- Knochen langdenken, Knochen langziehen
- In die Aufspannung entspannen (aktiv entspannen)
- Diagonal beatmen: linker Sitzbeinhöcker einatmen, rechte Schulter ausatmen
- Vorderseite und Rückseite wie zwei Klettverschlüsse zusammenbringen
- Mit dem Bauch atmen, nicht in den Bauch
- Von Ferse bis Kronenpunkt
- Von innen nach außen

VOKABULAR (wenn Level "beginner"):
Einfachere Sprache, gleiche Substanz:
- Beckenboden (statt Levator ani)
- Hinterkopf nach oben (statt Kronenpunkt)
- Schultern lösen, Kiefer weich
- Tief atmen, in den Bauch
- Füße spüren

ACTION-FELD:
- "stand": vollständige Aufrichtungssequenz (9 Schritte)
- "aufspannung": 90-Sekunden Mikro-Übung im Sitzen
- "breath": 4·4·6 Atem-Übung
- "emergency": bei spiral
- "flow": Beobachten ohne Eingreifen
- "ground": 5-4-3-2-1 bei Dissoziation
- "action": konkreter Schritt
- null: wenn keine Übung nötig ist

ANTWORTFORMAT (NUR JSON):
{
  "state": "rumination",
  "intervention": {
    "line1": "Der Gedanke ist nicht die Struktur.",
    "line2": "Du bist die Struktur.",
    "line3": "Kronenpunkt zur Decke. Sitzbeinhöcker zueinander.",
    "action": "aufspannung"
  }
}

line1 ist Pflicht. line2 und line3 optional.
action darf null sein.

Antworte AUSSCHLIESSLICH mit dem JSON.`;

/* ─── Eingabe-Validierung ──────────────────────────────────────────── */
interface RequestBody {
  text: string;
  level?: Level;
  history?: string[];
}

function validateBody(body: unknown): RequestBody | null {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  if (typeof b.text !== 'string' || b.text.trim().length === 0) return null;
  if (b.text.length > 2000) return null;
  const level: Level = b.level === 'beginner' ? 'beginner' : 'cantienica';
  const history = Array.isArray(b.history)
    ? (b.history.filter(h => typeof h === 'string') as string[]).slice(-3)
    : [];
  return { text: b.text.trim(), level, history };
}

/* ─── Ausgabe-Validierung ──────────────────────────────────────────── */
const VALID_STATES: ZustandsKey[] = [
  'calm', 'activated', 'rumination', 'spiral',
  'dissociated', 'actionReady', 'blocked',
];
const VALID_ACTIONS = [
  'stand', 'breath', 'emergency', 'flow', 'ground', 'action', 'aufspannung', null,
];

interface SenseiResponse {
  state: ZustandsKey;
  intervention: {
    line1: string;
    line2?: string;
    line3?: string;
    action: string | null;
  };
}

function validateOpenAIResponse(raw: unknown): SenseiResponse | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;

  if (!VALID_STATES.includes(r.state as ZustandsKey)) return null;
  if (!r.intervention || typeof r.intervention !== 'object') return null;

  const i = r.intervention as Record<string, unknown>;
  if (typeof i.line1 !== 'string' || i.line1.length === 0) return null;
  if (i.line1.length > 200) return null;
  if (i.line2 !== undefined && i.line2 !== null && (typeof i.line2 !== 'string' || i.line2.length > 200)) return null;
  if (i.line3 !== undefined && i.line3 !== null && (typeof i.line3 !== 'string' || i.line3.length > 200)) return null;

  const action = i.action === undefined ? null : i.action;
  if (!VALID_ACTIONS.includes(action as string | null)) return null;

  return {
    state: r.state as ZustandsKey,
    intervention: {
      line1: i.line1,
      line2: typeof i.line2 === 'string' ? i.line2 : undefined,
      line3: typeof i.line3 === 'string' ? i.line3 : undefined,
      action: action as string | null,
    },
  };
}

/* ─── Fallback auf lokale Heuristik ───────────────────────────────── */
function localFallback(text: string, level: Level, history: string[]): SenseiResponse {
  const { state, intervention } = localIntervene({
    text, level, history, recentlyUsed: [],
  });
  return {
    state,
    intervention: {
      line1: intervention.line1,
      line2: intervention.line2,
      action: intervention.action ?? null,
    },
  };
}

/* ─── OpenAI aufrufen ─────────────────────────────────────────────── */
async function callOpenAI(
  text: string,
  level: Level,
  history: string[],
): Promise<SenseiResponse | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const userMessage = [
    `Level: ${level}`,
    history.length > 0
      ? `Bisherige Eingaben:\n${history.map((h, i) => `  ${i + 1}. ${h}`).join('\n')}`
      : '',
    `Aktuelle Eingabe: "${text}"`,
  ].filter(Boolean).join('\n\n');

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.6,
        response_format: { type: 'json_object' }, // garantiert valides JSON
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      console.error('[sensei] OpenAI API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') return null;

    const parsed = JSON.parse(content);
    return validateOpenAIResponse(parsed);
  } catch (err) {
    console.error('[sensei] Call failed:', err);
    return null;
  }
}

/* ─── POST Handler ──────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const validated = validateBody(body);
  if (!validated) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // 1. Versuch: OpenAI
  const openaiResult = await callOpenAI(
    validated.text,
    validated.level ?? 'cantienica',
    validated.history ?? [],
  );

  if (openaiResult) {
    return NextResponse.json({
      ...openaiResult,
      source: 'claude', // wir behalten den Namen "claude" für die Frontend-Anzeige als "Sensei live"
    });
  }

  // 2. Versuch: lokale Heuristik
  const fallback = localFallback(
    validated.text,
    validated.level ?? 'cantienica',
    validated.history ?? [],
  );

  return NextResponse.json({
    ...fallback,
    source: 'fallback',
  });
}

/* GET — Health-Check */
export async function GET() {
  const hasKey = !!process.env.OPENAI_API_KEY;
  return NextResponse.json({
    status: 'ready',
    ai: hasKey ? 'configured' : 'not-configured',
    fallback: 'available',
  });
}
