import { auth } from '@clerk/nextjs/server';
import { redirect, notFound } from 'next/navigation';
import { getDocument, getDocuments } from '@/lib/documents';
import Editor from '@/components/editor/Editor';
import EditorSidebar from '@/components/editor/EditorSidebar';

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { id } = await params;
  const [doc, docs] = await Promise.all([
    getDocument(id, userId),
    getDocuments(userId),
  ]);

  if (!doc) notFound();

  return (
    <div className='flex h-screen bg-surface font-sans'>
      <EditorSidebar docs={docs} currentDocId={id} />
      <main className='flex-1 flex flex-col overflow-hidden'>
        <Editor doc={doc} />
      </main>
    </div>
  );
}
