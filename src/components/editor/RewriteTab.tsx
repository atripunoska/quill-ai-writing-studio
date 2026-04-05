'use client';

import { useState } from 'react';
import type { Editor } from '@tiptap/react';
import { useStream } from '@/hooks/useStream';
import { getRewritePrompt } from '@/lib/ai/prompts';
import { REWRITE_TONES } from '@/lib/constants';

export default function RewriteTab({ editor }: { editor: Editor | null }) {
  const [activeTone, setActiveTone] = useState('Concise');
  const [selectedText, setSelectedText] = useState('');
  const { output, status, start, cancel, reset } = useStream();
  const isStreaming = status === 'streaming';

  function handleGetSelection() {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to);
    if (text.trim()) setSelectedText(text);
  }

  async function handleRewrite() {
    if (!selectedText.trim()) return;
    await start(getRewritePrompt(selectedText, activeTone));
  }

  function handleAccept() {
    if (!editor || !output) return;
    const { from, to } = editor.state.selection;
    editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .insertContentAt(from, output)
      .run();
    reset();
    setSelectedText('');
  }

  function handleDismiss() {
    reset();
  }

  return (
    <div>
      {/* Selected text preview */}
      <div
        className='rewrite-selection-box cursor-pointer'
        onClick={handleGetSelection}
      >
        {selectedText || 'Select text in the editor to rewrite it here...'}
      </div>

      {/* Tone selector */}
      <label className='text-sm font-medium text-ink-muted block mb-2'>
        Choose a tone
      </label>
      <div className='flex flex-wrap gap-1.5 mb-4'>
        {REWRITE_TONES.map((tone) => (
          <button
            key={tone}
            onClick={() => setActiveTone(tone)}
            className={`text-xs px-3 py-1 rounded-full border cursor-pointer transition-all ${
              activeTone === tone
                ? 'bg-ai-glow text-white border-ai-glow'
                : 'text-ink-muted border-border hover:border-ai-glow hover:text-ai-glow'
            }`}
          >
            {tone}
          </button>
        ))}
      </div>

      <div className='flex gap-2 mb-0'>
        <button
          onClick={handleRewrite}
          disabled={isStreaming || !selectedText.trim()}
          className='flex-1 text-sm font-medium py-2 bg-ai-glow text-white rounded cursor-pointer hover:bg-[#6a5e9a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isStreaming ? 'Rewriting...' : 'Rewrite'}
        </button>
        <button
          onClick={cancel}
          disabled={!isStreaming}
          className='text-sm px-3 py-2 border border-border text-ink-muted rounded cursor-pointer hover:text-danger hover:border-danger transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Cancel
        </button>
      </div>

      {/* Side by side comparison */}
      {(selectedText || output) && (
        <>
          <div className='rewrite-comparison'>
            <div className='compare-box original'>
              <span className='compare-label orig'>Original</span>
              {selectedText}
            </div>
            <div className='compare-box rewritten'>
              <span className='compare-label new'>Rewritten</span>
              {output || '...'}
            </div>
          </div>
          {output && (
            <div className='ai-output-actions'>
              <button onClick={handleAccept} className='btn-insert'>
                Accept
              </button>
              <button onClick={handleDismiss} className='btn-dismiss'>
                Dismiss
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
