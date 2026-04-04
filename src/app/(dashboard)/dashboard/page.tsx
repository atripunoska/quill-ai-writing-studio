import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getDocuments } from '@/lib/documents';
import Sidebar from '@/components/dashboard/Sidebar';
import DocsList from '@/components/dashboard/DocsList';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const docs = await getDocuments(userId);

  return (
    <div className='flex h-screen bg-surface font-sans'>
      <Sidebar docs={docs} />
      <main className='flex-1 overflow-y-auto p-10'>
        <DocsList docs={docs} />
      </main>
    </div>
  );
}
