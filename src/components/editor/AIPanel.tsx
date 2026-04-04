'use client';

import { useState } from 'react';
import SuggestTab from './SuggestTab';
import RewriteTab from './RewriteTab';
import CoachTab from './CoachTab';
import { Editor } from '@tiptap/react';

type Tab = 'suggest' | 'rewrite' | 'coach';

const tabs: { id: Tab; label: string }[] = [
  { id: 'suggest', label: 'Suggest' },
  { id: 'rewrite', label: 'Rewrite' },
  { id: 'coach', label: 'Coach' },
];

export default function AIPanel({ editor }: { editor: Editor | null }) {
  const [activeTab, setActiveTab] = useState<Tab>('suggest');

  return (
    <aside className='w-72 shrink-0 flex flex-col border-l border-border bg-surface h-full'>
      <div className='px-4 pt-4 pb-0 border-b border-border'>
        <div className='flex items-center gap-1.5 mb-3'>
          <div className='w-1.5 h-1.5 rounded-full bg-ai-glow animate-pulse' />
          <span className='font-mono text-[0.62rem] tracking-widest uppercase text-ai-glow'>
            AI Studio
          </span>
        </div>
        <div className='flex gap-0'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 text-xs font-medium py-2 border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-ai-glow text-ai-glow'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4'>
        {activeTab === 'suggest' && <SuggestTab />}
        {activeTab === 'rewrite' && <RewriteTab editor={editor} />}
        {activeTab === 'coach' && <CoachTab editor={editor} />}
      </div>
    </aside>
  );
}
