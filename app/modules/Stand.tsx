'use client';

import { useState } from 'react';
import { Stage, Tag, Display, Rule, Btn, Ghost, BoneCue } from '@/components/ui';
import { BreathOrb } from '@/components/BreathOrb';
import { useSoundscape } from '@/lib/useSoundscape';
import type { Level } from '@/lib/library';

interface StandStep {
  tag: string;
  cue: string;
  hint: string;
  bone?: string; // welcher Knochen / welche Struktur ist aktiv
}

const SEQUENCES: Record<Level, StandStep[]> = {
  cantienica: [
    { tag: '01', cue: 'Fußgewölbe aufrichten.',     hint: 'Vier Punkte: Großzeh, Kleinzeh, Ferse innen, Ferse außen. Wolken unter den Fersen.', bone: 'Fußgewölbe' },
    { tag: '02', cue: 'Füße in V-Position.',         hint: 'Fersen näher zusammen als die Zehen. Kniescheiben nach vorn lang.', bone: 'Beinachsen' },
    { tag: '03', cue: 'Sitzbeinhöcker zueinander.',  hint: 'Sanft. Du aktivierst den Levator ani — die innerste Schicht des Beckenbodens.', bone: 'Sitzbeinhöcker · Levator ani' },
    { tag: '04', cue: 'Becken in die Mittellage.',   hint: 'Schambein und Steißbein im Lot. Weder gekippt noch zurück.', bone: 'Becken · Schambein · Steißbein' },
    { tag: '05', cue: 'Wirbelsäule aufspannen.',     hint: 'Kreuzbein tiefer in den Körper. Hinterkopf zur Decke. Knochen langdenken.', bone: 'Wirbelsäule · Kreuzbein' },
    { tag: '06', cue: 'Schultergürtel tief, flach, weit.', hint: 'Schulterblätter sinken zum Rücken. Kehlkopf frei. Schlüsselbeine langgedehnt.', bone: 'Schulterblätter · Schlüsselbeine' },
    { tag: '07', cue: 'Zwerchfell senken.',          hint: 'Mit dem Bauch atmen, nicht in den Bauch. Atem in die Flanken, Rippen weiten.', bone: 'Zwerchfell · Rippen' },
    { tag: '08', cue: 'Zungenenden an den Gaumen.',  hint: 'Mund leicht geöffnet. Kiefer weich. Stirn entspannt.', bone: 'Kiefer · Zunge' },
    { tag: '09', cue: 'Kronenpunkt zur Decke.',      hint: 'Vier Fingerbreit hinter dem höchsten Punkt des Kopfes. Wachse in die volle Höhe.', bone: 'Kronenpunkt' },
  ],
  beginner: [
    { tag: '01', cue: 'Spüre die Füße.',            hint: 'Vier Punkte: Großzeh, Kleinzeh, Ferse innen, Ferse außen.', bone: 'Füße' },
    { tag: '02', cue: 'Richte das Becken aus.',     hint: 'Weder nach vorn gekippt noch zurück. Mittig.', bone: 'Becken' },
    { tag: '03', cue: 'Verlängere den Hinterkopf.', hint: 'Nach oben. Wie an einem feinen Faden.', bone: 'Hinterkopf' },
    { tag: '04', cue: 'Löse die Schultern.',        hint: 'Weg von den Ohren. Schwer hängen lassen.', bone: 'Schultern' },
    { tag: '05', cue: 'Entspanne den Kiefer.',      hint: 'Zunge am Gaumen. Lippen leicht geschlossen.', bone: 'Kiefer' },
    { tag: '06', cue: 'Vertiefe den Atem.',         hint: 'In den Bauch. Nicht in die Brust.', bone: 'Atem' },
    { tag: '07', cue: 'Halte den Blick ruhig.',     hint: 'Weicher Fokus. Geradeaus.', bone: 'Blick' },
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
  useSoundscape('stand'); // tiefes warmes Brummen — Boden

  const points = SEQUENCES[level];
  const [i, setI] = useState(0);
  const step = points[i];

  return (
    <Stage glowColor="accent">
      <Tag color="accent">Knochen denken · Schritt {step.tag} von {points.length}</Tag>
      <div className="h-3" />

      {/* Knochen-Anker, sichtbar gemacht */}
      {step.bone && (
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade">
          <div className="w-1 h-1 rotate-45 bg-accent" />
          <BoneCue>{step.bone}</BoneCue>
          <div className="w-1 h-1 rotate-45 bg-accent" />
        </div>
      )}

      <Display>{step.cue}</Display>
      <div className="h-5" />
      <p className="text-ink-dim text-[17px] leading-[1.6] max-w-[480px] mx-auto animate-fade">
        {step.hint}
      </p>
      <div className="h-12" />

      <div className="flex justify-center">
        <BreathOrb size={160} phase={i % 2 ? 'in' : 'out'} color="accent" />
      </div>

      <div className="h-14" />

      {/* Fortschritts-Knochenkette */}
      <div className="flex justify-center gap-1.5 mb-6">
        {points.map((_, idx) => (
          <div
            key={idx}
            className="h-px rounded-full transition-all duration-500"
            style={{
              width: idx === i ? 24 : 12,
              background: idx < i ? '#D9BE85' : idx === i ? '#E8C470' : '#3A2F22',
              opacity: idx <= i ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        {i > 0 && <Btn kind="secondary" onClick={() => setI(i - 1)}>Zurück</Btn>}
        {i < points.length - 1
          ? <Btn onClick={() => setI(i + 1)}>Weiter</Btn>
          : <Btn onClick={onComplete}>Aufgespannt.</Btn>}
      </div>
      <div className="h-2" />
      <Ghost onClick={onExit}>Abbrechen</Ghost>
    </Stage>
  );
}
