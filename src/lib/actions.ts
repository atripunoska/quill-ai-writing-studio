'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  createDocument,
  deleteDocument,
  renameDocument,
  updateDocument,
} from './documents';
import { revalidatePath } from 'next/cache';

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

export async function deleteDocumentAction(id: string) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  await deleteDocument(id, userId);
  revalidatePath('/dashboard');
}

export async function renameDocumentAction(id: string, title: string) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  await renameDocument(id, userId, title);
  revalidatePath('/dashboard');
}
