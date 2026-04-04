'use client';

import type { Editor } from '@tiptap/react';
import { useStream } from '@/hooks/useStream';
import { getCoachPrompt } from '@/lib/ai/prompts';

export default function CoachTab({ editor }: { editor: Editor | null }) {
  const { output, status, start, cancel } = useStream();

  async function handleAnalyse() {
    if (!editor) return;
    const content = editor.getText();
    if (!content.trim()) return;
    await start(getCoachPrompt(content));
  }

  const isStreaming = status === 'streaming';

  return (
    <div className='flex flex-col gap-3'>
      <p className='text-xs text-ink-muted leading-relaxed'>
        Get feedback on clarity, structure, and tone of your full document.
      </p>
      <div className='flex gap-2'>
        <button
          onClick={handleAnalyse}
          disabled={isStreaming || !editor}
          className='flex-1 text-sm font-medium py-2 bg-ai-glow text-white rounded cursor-pointer hover:bg-ai-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isStreaming ? 'Analysing...' : 'Analyse Document'}
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
          <p className='text-sm text-ink leading-relaxed whitespace-pre-wrap'>
            {output}
          </p>
        ) : (
          <p className='font-mono text-[0.62rem] text-ink-ghost'>
            Feedback will appear here...
          </p>
        )}
      </div>
    </div>
  );
}
