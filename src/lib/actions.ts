'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { createDocument, updateDocument } from './documents';

export async function createDocumentAction() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const doc = await createDocument(userId);
  redirect(`/editor/${doc.id}`);
}

export async function updateDocumentAction(
  id: string,
  data: { title?: string; content?: string },
) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  await updateDocument(id, userId, data);
}
