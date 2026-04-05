'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Document } from '@/lib/documents';
import { getRelativeTime, getWordCount } from '@/lib/utils';
import { deleteDocumentAction, renameDocumentAction } from '@/lib/actions';

export default function DocCard({ doc }: { doc: Document }) {
  const wordCount = getWordCount(doc.content);
  const updated = getRelativeTime(doc.updated_at);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(doc.title);

  async function handleRename() {
    if (title.trim() === doc.title) {
      setIsEditing(false);
      return;
    }
    await renameDocumentAction(doc.id, title.trim() || 'Untitled');
    setIsEditing(false);
  }

  return (
    <div className='group relative bg-surface-raised border border-border rounded-md p-6 transition-all hover:-translate-y-0.5 hover:border-quill-bright hover:shadow-md overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-quill to-ai-glow opacity-0 group-hover:opacity-100 transition-opacity' />

      {/* Delete button */}
      <form
        action={deleteDocumentAction.bind(null, doc.id)}
        className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10'
      >
        <button
          type='submit'
          className='w-6 h-6 flex items-center justify-center rounded text-ink-ghost hover:text-danger hover:bg-parchment-deep transition-all text-xs cursor-pointer'
        >
          ✕
        </button>
      </form>

      {/* Title — editable on click */}
      {isEditing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename();
            if (e.key === 'Escape') {
              setTitle(doc.title);
              setIsEditing(false);
            }
          }}
          className='w-full font-serif text-xl font-medium text-ink bg-transparent border-b border-quill outline-none mb-2'
        />
      ) : (
        <h2
          className='font-serif text-xl font-medium text-ink mb-2 cursor-text'
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h2>
      )}

      <Link href={`/editor/${doc.id}`} className='block'>
        <p className='text-sm leading-relaxed text-ink-muted mb-5 line-clamp-3'>
          {doc.content || 'Start writing something amazing...'}
        </p>
        <div className='flex items-center justify-between'>
          <span className='font-mono text-[0.62rem] text-ink-ghost'>
            {updated}
          </span>
          <span className='font-mono text-[0.62rem] text-quill-deep bg-quill/10 px-2 py-0.5 rounded-sm'>
            {wordCount} words
          </span>
        </div>
      </Link>
    </div>
  );
}
