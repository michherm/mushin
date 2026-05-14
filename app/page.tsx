'use client';

/**
 * Page — das Routing zwischen den Modulen.
 * Eine einzige Client-Seite. Kein React Router nötig.
 */

import { useState } from 'react';
import { useLevel } from '@/lib/useLevel';
import { store } from '@/lib/store';
import { SoundToggle } from '@/components/ui';
import { SpeechOutToggle } from '@/components/SpeechOutToggle';
import { SpeechOutputProvider } from '@/lib/SpeechOutputContext';
import { Home } from '@/components/Home';
import { Stand } from '@/modules/Stand';
import { Breath } from '@/modules/Breath';
import { Sensei } from '@/modules/Sensei';
import { Flow } from '@/modules/Flow';
import { Ground } from '@/modules/Ground';
import { ActionStep } from '@/modules/ActionStep';
import { Emergency } from '@/modules/Emergency';
import { Patterns } from '@/modules/Patterns';
import { Aufspannung } from '@/modules/Aufspannung';

type Mode =
  | 'home'
  | 'stand' | 'breath' | 'sensei' | 'flow' | 'ground' | 'action'
  | 'emergency' | 'patterns' | 'aufspannung';

export default function Page() {
  const [mode, setMode] = useState<Mode>('home');
  const [level, setLevel] = useLevel();

  const finish = (type: 'stand' | 'breath' | 'flow' | 'ground') => {
    store.record({ type });
    setMode('home');
  };

  const renderModule = () => {
    if (mode === 'home')        return <Home go={(m) => setMode(m as Mode)} level={level} setLevel={setLevel} />;
    if (mode === 'stand')       return <Stand level={level} onComplete={() => finish('stand')} onExit={() => setMode('home')} />;
    if (mode === 'breath')      return <Breath onComplete={() => finish('breath')} onExit={() => setMode('home')} />;
    if (mode === 'sensei')      return <Sensei level={level} onModule={(m) => setMode(m as Mode)} onExit={() => setMode('home')} />;
    if (mode === 'flow')        return <Flow onComplete={() => finish('flow')} onExit={() => setMode('home')} />;
    if (mode === 'ground')      return <Ground onComplete={() => finish('ground')} onExit={() => setMode('home')} />;
    if (mode === 'action')      return <ActionStep onComplete={() => setMode('home')} onExit={() => setMode('home')} />;
    if (mode === 'emergency')   return <Emergency level={level} onComplete={() => { store.record({ type: 'emergency' }); setMode('home'); }} />;
    if (mode === 'aufspannung') return <Aufspannung level={level} onComplete={() => { store.record({ type: 'flow' }); setMode('home'); }} onExit={() => setMode('home')} />;
    if (mode === 'patterns')    return <Patterns onExit={() => setMode('home')} />;
    return null;
  };

  return (
    <SpeechOutputProvider>
      <SpeechOutToggle />
      <SoundToggle />
      {renderModule()}
    </SpeechOutputProvider>
  );
}
