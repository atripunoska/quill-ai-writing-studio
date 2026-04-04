'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useState } from 'react';
import type { Document } from '@/lib/documents';
import { updateDocumentAction } from '@/lib/actions';
import { useAutosave } from '@/hooks/useAutosave';
import AIPanel from './AIPanel';
import { useDocumentStore } from '@/stores/useDocumentStore';
import Link from 'next/link';

export default function Editor({ doc }: { doc: Document }) {
  const [title, setTitle] = useState(doc.title);

  const { setTitle: setStoreTitle, setContent } = useDocumentStore();

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    setStoreTitle(e.target.value);
    save({ title: e.target.value });
  }

  const saveFn = useCallback(
    async (data: { title?: string; content?: string }) => {
      await updateDocumentAction(doc.id, data);
    },
    [doc.id],
  );

  const { status, save } = useAutosave(saveFn);

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
      setContent(editor.getHTML());
      save({ content: editor.getHTML() });
    },
  });

  const saveLabel =
    status === 'saving'
      ? 'Saving...'
      : status === 'saved'
        ? 'Saved'
        : 'Unsaved';

  return (
    <div className='flex h-full'>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <div className='h-12 border-b border-border bg-surface-raised flex items-center px-6 gap-3 shrink-0'>
          <Link
            href='/dashboard'
            className='font-mono text-[0.62rem] text-ink-ghost hover:text-ink transition-colors mr-2'
          >
            ← Dashboard
          </Link>

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
              {saveLabel}
            </span>
            <span className='font-mono text-[0.62rem] text-ink-ghost'>
              {title}
            </span>
          </div>
        </div>

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
