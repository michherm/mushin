'use client';

import { useState } from 'react';
import { Stage, Tag, Display, Rule, Btn, Ghost } from '@/components/ui';
import { BreathOrb } from '@/components/BreathOrb';
import type { Level } from '@/lib/library';

interface StandStep {
  tag: string;
  cue: string;
  hint: string;
}

/**
 * Cantienica-Aufrichtung: von Ferse bis Kronenpunkt.
 * Folgt der Methoden-Logik: Knochen ausrichten, Aufspannung herstellen,
 * Tiefenmuskulatur aktivieren — von unten nach oben.
 */
const SEQUENCES: Record<Level, StandStep[]> = {
  cantienica: [
    {
      tag: '01',
      cue: 'Fußgewölbe aufrichten.',
      hint: 'Vier Punkte: Großzeh, Kleinzeh, Ferse innen, Ferse außen. Wolken unter den Fersen.',
    },
    {
      tag: '02',
      cue: 'Füße in V-Position.',
      hint: 'Fersen näher zusammen als die Zehen. Kniescheiben nach vorn lang.',
    },
    {
      tag: '03',
      cue: 'Sitzbeinhöcker zueinander.',
      hint: 'Sanft. Du aktivierst den Levator ani — die innerste Schicht des Beckenbodens.',
    },
    {
      tag: '04',
      cue: 'Becken in die Mittellage.',
      hint: 'Schambein und Steißbein im Lot. Weder gekippt noch zurück.',
    },
    {
      tag: '05',
      cue: 'Wirbelsäule aufspannen.',
      hint: 'Kreuzbein tiefer in den Körper. Hinterkopf zur Decke. Knochen langdenken.',
    },
    {
      tag: '06',
      cue: 'Schultergürtel tief, flach, weit.',
      hint: 'Schulterblätter sinken zum Rücken. Kehlkopf frei. Schlüsselbeine langgedehnt.',
    },
    {
      tag: '07',
      cue: 'Zwerchfell senken.',
      hint: 'Mit dem Bauch atmen, nicht in den Bauch. Atem in die Flanken, Rippen weiten.',
    },
    {
      tag: '08',
      cue: 'Zungenenden an den Gaumen.',
      hint: 'Mund leicht geöffnet. Kiefer weich. Stirn entspannt.',
    },
    {
      tag: '09',
      cue: 'Kronenpunkt zur Decke.',
      hint: 'Vier Fingerbreit hinter dem höchsten Punkt des Kopfes. Wachse in die volle Höhe.',
    },
  ],
  beginner: [
    { tag: '01', cue: 'Spüre die Füße.',            hint: 'Vier Punkte: Großzeh, Kleinzeh, Ferse innen, Ferse außen.' },
    { tag: '02', cue: 'Richte das Becken aus.',     hint: 'Weder nach vorn gekippt noch zurück. Mittig.' },
    { tag: '03', cue: 'Verlängere den Hinterkopf.', hint: 'Nach oben. Wie an einem feinen Faden.' },
    { tag: '04', cue: 'Löse die Schultern.',        hint: 'Weg von den Ohren. Schwer hängen lassen.' },
    { tag: '05', cue: 'Entspanne den Kiefer.',      hint: 'Zunge am Gaumen. Lippen leicht geschlossen.' },
    { tag: '06', cue: 'Vertiefe den Atem.',         hint: 'In den Bauch. Nicht in die Brust.' },
    { tag: '07', cue: 'Halte den Blick ruhig.',     hint: 'Weicher Fokus. Geradeaus.' },
  ],
};

export function Stand({
  level,
  onComplete,
  onExit,
}: {
  level: Level;
  onComplete: () => void;
  onExit: () => void;
}) {
  const points = SEQUENCES[level];
  const [i, setI] = useState(0);
  const step = points[i];

  return (
    <Stage>
      <Tag>Schritt {step.tag} · Stand · {level === 'cantienica' ? 'Cantienica' : 'Basis'}</Tag>
      <div className="h-8" />
      <Display>{step.cue}</Display>
      <div className="h-5" />
      <p className="text-ink-dim text-[17px] leading-[1.5] max-w-[480px] mx-auto animate-fade">
        {step.hint}
      </p>
      <div className="h-12" />
      <div className="flex justify-center">
        <BreathOrb size={160} phase={i % 2 ? 'in' : 'out'} />
      </div>
      <div className="h-14" />
      <div className="flex justify-center"><Rule /></div>
      <div className="h-6" />
      <div className="flex gap-3 justify-center flex-wrap">
        {i > 0 && <Btn kind="secondary" onClick={() => setI(i - 1)}>Zurück</Btn>}
        {i < points.length - 1
          ? <Btn onClick={() => setI(i + 1)}>Weiter</Btn>
          : <Btn onClick={onComplete}>Stand erreicht</Btn>}
      </div>
      <div className="h-2" />
      <Ghost onClick={onExit}>Abbrechen</Ghost>
    </Stage>
  );
}
