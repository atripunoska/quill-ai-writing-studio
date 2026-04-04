'use client';

import { useState } from 'react';
import type { Editor } from '@tiptap/react';

export default function CoachTab({ editor }: { editor: Editor | null }) {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAnalyse() {
    if (!editor) return;
    const content = editor.getText();
    if (!content.trim()) return;

    setLoading(true);
    setFeedback('');

    const res = await fetch('/api/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `You are a writing coach. Analyse the following text and give concise feedback on clarity, structure, and tone. Be specific and constructive.\n\n${content}`,
      }),
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setFeedback((prev) => prev + decoder.decode(value));
    }

    setLoading(false);
  }

  return (
    <div className='flex flex-col gap-3'>
      <p className='text-xs text-ink-muted leading-relaxed'>
        Get feedback on clarity, structure, and tone of your full document.
      </p>
      <button
        onClick={handleAnalyse}
        disabled={loading || !editor}
        className='w-full text-sm font-medium py-2 bg-ai-glow text-white rounded cursor-pointer hover:bg-ai-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading ? 'Analysing...' : 'Analyse Document'}
      </button>
      <div className='min-h-16 rounded border border-border bg-surface-raised p-3'>
        {feedback ? (
          <p className='text-sm text-ink leading-relaxed whitespace-pre-wrap'>
            {feedback}
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
