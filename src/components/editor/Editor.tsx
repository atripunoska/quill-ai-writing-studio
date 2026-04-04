'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useRef, useState } from 'react';
import type { Document } from '@/lib/documents';
import { updateDocumentAction } from '@/lib/actions';
import AIPanel from './AIPanel';

export default function Editor({ doc }: { doc: Document }) {
  const [title, setTitle] = useState(doc.title);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>(
    'saved',
  );
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(
    (data: { title?: string; content?: string }) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      setSaveStatus('unsaved');
      debounceTimer.current = setTimeout(async () => {
        setSaveStatus('saving');
        await updateDocumentAction(doc.id, data);
        setSaveStatus('saved');
      }, 1000);
    },
    [doc.id],
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: doc.content || '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'outline-none font-serif text-lg leading-relaxed text-ink min-h-full',
      },
    },
    onUpdate: ({ editor }) => {
      save({ content: editor.getHTML() });
    },
  });

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    save({ title: e.target.value });
  }
  return (
    <div className='flex h-full'>
      <div className='flex flex-col flex-1 overflow-hidden'>
        {/* Topbar */}
        <div className='h-12 border-b border-border bg-surface-raised flex items-center px-6 gap-3 shrink-0'>
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor}
            className={`font-mono text-xs px-2 py-1 border rounded-sm transition-all cursor-pointer ${editor?.isActive('bold') ? 'bg-parchment-deep border-border-strong text-ink' : 'border-border text-ink-muted hover:text-ink'}`}
          >
            B
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor}
            className={`font-mono text-xs px-2 py-1 border rounded-sm transition-all cursor-pointer italic ${editor?.isActive('italic') ? 'bg-parchment-deep border-border-strong text-ink' : 'border-border text-ink-muted hover:text-ink'}`}
          >
            I
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={!editor}
            className={`font-mono text-xs px-2 py-1 border rounded-sm transition-all cursor-pointer ${editor?.isActive('heading', { level: 2 }) ? 'bg-parchment-deep border-border-strong text-ink' : 'border-border text-ink-muted hover:text-ink'}`}
          >
            H2
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            disabled={!editor}
            className={`font-mono text-xs px-2 py-1 border rounded-sm transition-all cursor-pointer ${editor?.isActive('bulletList') ? 'bg-parchment-deep border-border-strong text-ink' : 'border-border text-ink-muted hover:text-ink'}`}
          >
            • List
          </button>
          <div className='ml-auto flex items-center gap-4'>
            <span className='font-mono text-[0.62rem] text-ink-ghost'>
              {saveStatus === 'saving'
                ? 'Saving...'
                : saveStatus === 'saved'
                  ? 'Saved'
                  : 'Unsaved'}
            </span>
            <span className='font-mono text-[0.62rem] text-ink-ghost'>
              {title}
            </span>
          </div>
        </div>

        {/* Editor area */}
        <div className='flex-1 overflow-y-auto px-24 py-16'>
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder='Untitled'
            className='w-full font-serif text-4xl font-light text-ink bg-transparent outline-none mb-8 placeholder:text-ink-ghost'
          />
          <EditorContent editor={editor} className='min-h-96' />
        </div>
      </div>

      <AIPanel editor={editor} />
    </div>
  );
}
