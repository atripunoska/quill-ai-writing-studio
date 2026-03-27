import type { Doc } from '@/lib/mock-data';

export default function DocCard({ doc }: { doc: Doc }) {
  return (
    <div className='group relative bg-surface-raised border border-border rounded-md p-6 cursor-pointer transition-all hover:-translate-y-0.5 hover:border-quill-bright hover:shadow-md overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-quill to-ai-glow opacity-0 group-hover:opacity-100 transition-opacity' />
      <h3 className='font-serif text-xl font-medium text-ink mb-2'>
        {doc.title}
      </h3>
      <p className='text-sm leading-relaxed text-ink-muted mb-5 line-clamp-3'>
        {doc.excerpt}
      </p>
      <div className='flex items-center justify-between'>
        <span className='font-mono text-[0.62rem] text-ink-ghost'>
          {doc.updated}
        </span>
        <span className='font-mono text-[0.62rem] text-quill-deep bg-quill/10 px-2 py-0.5 rounded-sm'>
          {doc.words}
        </span>
      </div>
    </div>
  );
}
