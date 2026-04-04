'use client';

import { useState } from 'react';
import type { Editor } from '@tiptap/react';
import { useStream } from '@/hooks/useStream';
import { getRewritePrompt } from '@/lib/ai/prompts';
import { REWRITE_TONES } from '@/lib/constants';

export default function RewriteTab({ editor }: { editor: Editor | null }) {
  const [activeTone, setActiveTone] = useState('Professional');
  const { output, status, start, cancel, reset } = useStream();

  async function handleRewrite() {
    if (!editor) return;
    const selection = editor.state.selection;
    const text = editor.state.doc.textBetween(selection.from, selection.to);
    if (!text.trim()) return;
    await start(getRewritePrompt(text, activeTone));
  }

  function handleInsert() {
    if (!editor || !output) return;
    editor.chain().focus().insertContent(output).run();
    reset();
  }

  const isStreaming = status === 'streaming';

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
      <div className='flex gap-2'>
        <button
          onClick={handleRewrite}
          disabled={isStreaming || !editor}
          className='flex-1 text-sm font-medium py-2 bg-ai-glow text-white rounded cursor-pointer hover:bg-ai-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isStreaming ? 'Rewriting...' : 'Rewrite Selection'}
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
