'use client';

import { useState } from 'react';
import { useStream } from '@/hooks/useStream';
import { getSuggestPrompt } from '@/lib/ai/prompts';
import type { Editor } from '@tiptap/react';

export default function SuggestTab({ editor }: { editor: Editor | null }) {
  const [prompt, setPrompt] = useState('');
  const { output, status, start, cancel, reset } = useStream();
  const isStreaming = status === 'streaming';

  async function handleGenerate() {
    if (!prompt.trim()) return;
    await start(getSuggestPrompt(prompt));
  }

  function handleInsert() {
    if (!editor || !output) return;
    editor
      .chain()
      .focus()
      .insertContentAt(editor.state.selection.anchor, output)
      .run();
    reset();
    setPrompt('');
  }

  function handleDismiss() {
    reset();
    setPrompt('');
  }

  return (
    <div>
      <div className='mb-4'>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Ask Quill to continue, expand, or explore an idea...\n\ne.g. 'Continue with a counterargument'`}
          className='w-full text-sm font-sans bg-surface-raised border border-border rounded p-3 text-ink placeholder:text-ink-ghost outline-none focus:border-ai-glow transition-colors resize-none h-24'
        />
        <div className='flex gap-2 mt-1.5'>
          <button
            onClick={handleGenerate}
            disabled={isStreaming || !prompt.trim()}
            className='flex-1 text-sm font-medium py-2 bg-ai-glow text-white rounded cursor-pointer hover:bg-[#6a5e9a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isStreaming ? 'Generating...' : 'Generate'}
          </button>
          <button
            onClick={cancel}
            disabled={!isStreaming}
            className='text-sm px-3 py-2 border border-border text-ink-muted rounded cursor-pointer hover:text-danger hover:border-danger transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Cancel
          </button>
        </div>
      </div>

      {output && (
        <div className='ai-streaming-output'>
          <p>{output}</p>
          <div className='ai-output-actions'>
            <button onClick={handleInsert} className='btn-insert'>
              Insert at cursor
            </button>
            <button onClick={handleDismiss} className='btn-dismiss'>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
