'use client';

import { useState } from 'react';
import type { Editor } from '@tiptap/react';

import { REWRITE_TONES } from '@/lib/constants';

export default function RewriteTab({ editor }: { editor: Editor | null }) {
  const [activeTone, setActiveTone] = useState('Professional');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRewrite() {
    if (!editor) return;
    const selection = editor.state.selection;
    const text = editor.state.doc.textBetween(selection.from, selection.to);

    if (!text.trim()) return;

    setLoading(true);
    setOutput('');

    const res = await fetch('/api/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Rewrite the following text in a ${activeTone.toLowerCase()} tone. Return only the rewritten text, no explanation.\n\n${text}`,
      }),
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

  function handleInsert() {
    if (!editor || !output) return;
    editor.chain().focus().insertContent(output).run();
    setOutput('');
  }

  return (
    <div className='flex flex-col gap-3'>
      <p className='text-xs text-ink-muted leading-relaxed'>
        Select text in the editor, choose a tone, and rewrite it.
      </p>
      <div className='flex flex-wrap gap-1.5'>
        {REWRITE_TONES.map((tone) => (
          <button
            key={tone}
            onClick={() => setActiveTone(tone)}
            className={`text-xs px-3 py-1 rounded-full border cursor-pointer transition-all ${
              activeTone === tone
                ? 'bg-ai-glow text-white border-ai-glow'
                : 'bg-transparent text-ink-muted border-border hover:text-ink'
            }`}
          >
            {tone}
          </button>
        ))}
      </div>
      <button
        onClick={handleRewrite}
        disabled={loading || !editor}
        className='w-full text-sm font-medium py-2 bg-ai-glow text-white rounded cursor-pointer hover:bg-ai-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading ? 'Rewriting...' : 'Rewrite Selection'}
      </button>
      <div className='min-h-16 rounded border border-border bg-surface-raised p-3'>
        {output ? (
          <>
            <p className='font-serif text-sm text-ink leading-relaxed mb-3'>
              {output}
            </p>
            <button
              onClick={handleInsert}
              className='text-xs font-medium px-3 py-1.5 bg-ink text-parchment rounded cursor-pointer hover:bg-ink-soft transition-colors'
            >
              Insert into editor
            </button>
          </>
        ) : (
          <p className='font-mono text-[0.62rem] text-ink-ghost'>
            Rewritten text will appear here...
          </p>
        )}
      </div>
    </div>
  );
}
