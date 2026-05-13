'use client';

/**
 * Page — das Routing zwischen den Modulen.
 * Eine einzige Client-Seite. Kein React Router nötig.
 * 
 * State:
 *   mode: welches Modul ist aktiv
 *   level: Cantienica oder Beginner (persistent via Hook)
 */

import { useState } from 'react';
import { useLevel } from '@/lib/useLevel';
import { store } from '@/lib/store';
import { Home } from '@/components/Home';
import { Stand } from '@/modules/Stand';
import { Breath } from '@/modules/Breath';
import { Sensei } from '@/modules/Sensei';
import { Flow } from '@/modules/Flow';
import { Ground } from '@/modules/Ground';
import { ActionStep } from '@/modules/ActionStep';
import { Emergency } from '@/modules/Emergency';
import { Patterns } from '@/modules/Patterns';

type Mode =
  | 'home'
  | 'stand' | 'breath' | 'sensei' | 'flow' | 'ground' | 'action'
  | 'emergency' | 'patterns';

export default function Page() {
  const [mode, setMode] = useState<Mode>('home');
  const [level, setLevel] = useLevel();

  /** Modul abschließen → Pattern speichern → zurück. */
  const finish = (type: 'stand' | 'breath' | 'flow' | 'ground') => {
    store.record({ type });
    setMode('home');
  };

  if (mode === 'home') {
    return <Home go={(m) => setMode(m as Mode)} level={level} setLevel={setLevel} />;
  }

  if (mode === 'stand') {
    return (
      <Stand
        level={level}
        onComplete={() => finish('stand')}
        onExit={() => setMode('home')}
      />
    );
  }

  if (mode === 'breath') {
    return (
      <Breath
        onComplete={() => finish('breath')}
        onExit={() => setMode('home')}
      />
    );
  }

  if (mode === 'sensei') {
    return (
      <Sensei
        level={level}
        onModule={(m) => setMode(m as Mode)}
        onExit={() => setMode('home')}
      />
    );
  }

  if (mode === 'flow') {
    return (
      <Flow
        onComplete={() => finish('flow')}
        onExit={() => setMode('home')}
      />
    );
  }

  if (mode === 'ground') {
    return (
      <Ground
        onComplete={() => finish('ground')}
        onExit={() => setMode('home')}
      />
    );
  }

  if (mode === 'action') {
    return (
      <ActionStep
        onComplete={() => setMode('home')}
        onExit={() => setMode('home')}
      />
    );
  }

  if (mode === 'emergency') {
    return (
      <Emergency
        level={level}
        onComplete={() => {
          store.record({ type: 'emergency' });
          setMode('home');
        }}
      />
    );
  }

  if (mode === 'patterns') {
    return <Patterns onExit={() => setMode('home')} />;
  }

  return null;
}
