import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { mockDocs } from '@/lib/mock-data';
import Sidebar from '@/components/dashboard/Sidebar';
import DocGrid from '@/components/dashboard/DocGrid';
import SortControls from '@/components/dashboard/SortControls';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  return (
    <div className='flex h-screen bg-surface font-sans'>
      <Sidebar docs={mockDocs} />
      <main className='flex-1 overflow-y-auto p-10'>
        <div className='flex items-end justify-between mb-10'>
          <div>
            <h1 className='font-serif text-4xl font-light text-ink'>
              Your Documents
            </h1>
            <p className='text-sm text-ink-muted mt-1'>
              {mockDocs.length} documents
            </p>
          </div>
          <SortControls />
        </div>
        <DocGrid docs={mockDocs} />
      </main>
    </div>
  );
}
