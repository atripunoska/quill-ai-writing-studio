import type { Document } from '@/lib/documents';
import DocCard from './DocCard';

export default function DocGrid({ docs }: { docs: Document[] }) {
  if (docs.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-24 text-center'>
        <p className='font-serif text-2xl font-light text-ink-muted mb-2'>
          No documents yet
        </p>
        <p className='text-sm text-ink-ghost'>
          Click &quot;New Document&quot; to get started
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5'>
      {docs.map((doc) => (
        <DocCard key={doc.id} doc={doc} />
      ))}
    </div>
  );
}
