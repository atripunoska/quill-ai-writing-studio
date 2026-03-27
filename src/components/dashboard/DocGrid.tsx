import type { Doc } from '@/lib/mock-data';
import DocCard from './DocCard';

export default function DocGrid({ docs }: { docs: Doc[] }) {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5'>
      {docs.map((doc) => (
        <DocCard key={doc.id} doc={doc} />
      ))}
    </div>
  );
}
