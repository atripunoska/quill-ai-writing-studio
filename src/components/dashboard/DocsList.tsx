'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Document } from '@/lib/documents';
import DocGrid from './DocGrid';
import { createDocumentAction } from '@/lib/actions';
import { SortOption } from '@/types';
import { SignOutButton } from '@clerk/nextjs';

export default function DocsList({ docs }: { docs: Document[] }) {
  const [sort, setSort] = useState<SortOption>('recent');
  const [menuOpen, setMenuOpen] = useState(false);

  const sorted = [...docs].sort((a, b) => {
    if (sort === 'alphabetical') return a.title.localeCompare(b.title);
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return (
    <>
      {/* Mobile header */}
      <div className='flex items-center justify-between mb-6 md:hidden'>
        <div className='font-serif text-xl font-medium text-ink flex items-center gap-1'>
          Quill
          <span className='w-1.5 h-1.5 rounded-full bg-quill inline-block mb-1' />
        </div>
        <div className='flex items-center gap-2'>
          <form action={createDocumentAction}>
            <button
              type='submit'
              className='text-sm font-medium px-3 py-1.5 bg-ink text-parchment rounded cursor-pointer hover:bg-ink-soft transition-colors'
            >
              + New
            </button>
          </form>
          <Link
            href='/settings'
            className='text-sm text-ink-muted hover:text-ink transition-colors px-2 py-1.5'
          >
            ⚙
          </Link>
          <SignOutButton>
            <button className='font-mono text-[0.62rem] tracking-widest uppercase text-ink-ghost hover:text-danger transition-colors cursor-pointer'>
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>

      {/* Header */}
      <div className='flex items-end justify-between mb-6 md:mb-10'>
        <div>
          <h1 className='font-serif text-3xl md:text-4xl font-light text-ink'>
            Your Documents
          </h1>
          <p className='text-sm text-ink-muted mt-1'>{docs.length} documents</p>
        </div>
        <div className='flex gap-1.5'>
          {(['recent', 'alphabetical'] as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => setSort(option)}
              className={`font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1.5 border rounded-sm cursor-pointer transition-all ${
                sort === option
                  ? 'bg-ink text-parchment border-ink'
                  : 'bg-transparent text-ink-muted border-border hover:text-ink'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <DocGrid docs={sorted} />
    </>
  );
}
