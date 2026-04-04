'use client';

import { useState } from 'react';
import type { Document } from '@/lib/documents';
import DocGrid from './DocGrid';

type SortOption = 'recent' | 'alphabetical';

export default function DocsList({ docs }: { docs: Document[] }) {
  const [sort, setSort] = useState<SortOption>('recent');

  const sorted = [...docs].sort((a, b) => {
    if (sort === 'alphabetical') return a.title.localeCompare(b.title);
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return (
    <>
      <div className='flex items-end justify-between mb-10'>
        <div>
          <h1 className='font-serif text-4xl font-light text-ink'>
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
