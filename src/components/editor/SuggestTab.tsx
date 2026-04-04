'use client';

import { getSuggestPrompt } from '@/lib/ai/prompts';
import { useStream } from '@/hooks/useStream';
import { useState } from 'react';

export default function SuggestTab() {
  const [prompt, setPrompt] = useState('');
  const { output, status, start, cancel } = useStream();

  async function handleGenerate() {
    if (!prompt.trim()) return;
    await start(getSuggestPrompt(prompt));
  }

  const isStreaming = status === 'streaming';

  return (
    <div className='flex flex-col gap-3'>
      <p className='text-xs text-ink-muted leading-relaxed'>
        Describe what you want to write next, or ask for a continuation.
      </p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Continue the paragraph about...'
        className='w-full text-sm font-sans bg-surface-raised border border-border rounded p-3 text-ink placeholder:text-ink-ghost outline-none focus:border-quill transition-colors resize-none h-24'
      />
      <div className='flex gap-2'>
        <button
          onClick={handleGenerate}
          disabled={isStreaming || !prompt.trim()}
          className='flex-1 text-sm font-medium py-2 bg-ai-glow text-white rounded cursor-pointer hover:bg-ai-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isStreaming ? 'Generating...' : 'Generate'}
        </button>
        {isStreaming && (
          <button
            onClick={cancel}
            className='text-sm font-medium px-3 py-2 border border-border rounded cursor-pointer hover:border-border-strong transition-colors text-ink-muted'
          >
            Cancel
          </button>
        )}
      </div>
      <div className='min-h-16 rounded border border-border bg-surface-raised p-3'>
        {output ? (
          <p className='font-serif text-sm text-ink leading-relaxed'>
            {output}
          </p>
        ) : (
          <p className='font-mono text-[0.62rem] text-ink-ghost'>
            Output will appear here...
          </p>
        )}
      </div>
    </div>
  );
}
