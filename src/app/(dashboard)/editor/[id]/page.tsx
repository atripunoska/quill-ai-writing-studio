import { auth } from '@clerk/nextjs/server';
import { redirect, notFound } from 'next/navigation';
import { getDocument } from '@/lib/documents';
import Editor from '@/components/editor/Editor';

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { id } = await params;
  const doc = await getDocument(id, userId);
  if (!doc) notFound();

  return (
    <div className='flex h-screen bg-surface font-sans'>
      <main className='flex-1 flex flex-col overflow-hidden'>
        <Editor doc={doc} />
      </main>
    </div>
  );
}
