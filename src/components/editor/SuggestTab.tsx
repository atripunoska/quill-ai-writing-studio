'use client';

import { useState } from 'react';

export default function SuggestTab() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput('');

    const res = await fetch('/api/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setOutput((prev) => prev + decoder.decode(value));
    }

    setLoading(false);
  }

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
      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className='w-full text-sm font-medium py-2 bg-ai-glow text-white rounded cursor-pointer hover:bg-ai-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
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
