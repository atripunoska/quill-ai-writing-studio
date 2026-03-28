import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import Sidebar from '@/components/dashboard/Sidebar';
import DocGrid from '@/components/dashboard/DocGrid';
import SortControls from '@/components/dashboard/SortControls';
import { getDocuments } from '@/lib/documents';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const docs = await getDocuments(userId);

  return (
    <div className='flex h-screen bg-surface font-sans'>
      <Sidebar docs={docs} />
      <main className='flex-1 overflow-y-auto p-10'>
        <div className='flex items-end justify-between mb-10'>
          <div>
            <h1 className='font-serif text-4xl font-light text-ink'>
              Your Documents
            </h1>
            <p className='text-sm text-ink-muted mt-1'>
              {docs.length} documents
            </p>
          </div>
          <SortControls />
        </div>
        <DocGrid docs={docs} />
      </main>
    </div>
  );
}
