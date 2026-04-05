'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';
import type { Document } from '@/lib/documents';
import { createDocumentAction } from '@/lib/actions';
import { getRelativeTime } from '@/lib/utils';

type Props = {
  docs: Document[];
  currentDocId: string;
};

export default function EditorSidebar({ docs, currentDocId }: Props) {
  const { user } = useUser();

  const initials =
    [user?.firstName?.[0], user?.lastName?.[0]]
      .filter(Boolean)
      .join('')
      .toUpperCase() || 'U';

  return (
    <aside className='hidden md:flex w-60 shrink-0 flex-col h-screen bg-parchment-warm border-r border-border'>
      {/* Header */}
      <div className='p-5 border-b border-border'>
        <Link
          href='/dashboard'
          className='font-serif text-xl font-medium text-ink flex items-center gap-1 mb-4 hover:opacity-80 transition-opacity'
        >
          ← Quill
          <span className='w-1.5 h-1.5 rounded-full bg-quill inline-block mb-1' />
        </Link>
        <form action={createDocumentAction}>
          <button
            type='submit'
            className='w-full text-sm font-medium font-sans px-4 py-2.5 bg-ink text-parchment rounded cursor-pointer hover:bg-ink-soft transition-colors'
          >
            + New Document
          </button>
        </form>
      </div>

      {/* Search */}
      <div className='p-4 border-b border-border'>
        <input
          placeholder='Search...'
          className='w-full px-3 py-2 text-sm font-sans bg-surface-raised border border-border rounded text-ink placeholder:text-ink-ghost outline-none focus:border-quill transition-colors'
        />
      </div>

      {/* Label */}
      <div className='px-5 pt-4 pb-2 font-mono text-[0.6rem] tracking-widest uppercase text-ink-ghost'>
        Documents
      </div>

      {/* Doc list */}
      <div className='flex-1 overflow-y-auto'>
        {docs.map((doc) => {
          const isActive = doc.id === currentDocId;
          return (
            <Link key={doc.id} href={`/editor/${doc.id}`}>
              <div
                className={`px-5 py-3 cursor-pointer border-l-2 transition-all ${
                  isActive
                    ? 'border-quill bg-quill/10'
                    : 'border-transparent hover:bg-quill/5'
                }`}
              >
                <div className='text-sm font-medium text-ink truncate mb-0.5'>
                  {doc.title}
                </div>
                <div className='font-mono text-[0.62rem] text-ink-ghost'>
                  {isActive ? 'Editing now' : getRelativeTime(doc.updated_at)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className='p-4 border-t border-border'>
        <Link
          href='/settings'
          className='flex items-center gap-2.5 hover:opacity-80 transition-opacity mb-3'
        >
          <div className='w-8 h-8 rounded-full bg-gradient-to-br from-quill to-ai-glow flex items-center justify-center text-xs font-semibold text-white shrink-0'>
            {initials}
          </div>
          <div>
            <div className='text-sm font-medium text-ink'>My Account</div>
            <div className='text-[0.68rem] text-ink-ghost'>Settings</div>
          </div>
        </Link>
        <SignOutButton>
          <button className='w-full text-left font-mono text-[0.62rem] tracking-widest uppercase text-ink-ghost hover:text-danger transition-colors cursor-pointer'>
            Sign out
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
