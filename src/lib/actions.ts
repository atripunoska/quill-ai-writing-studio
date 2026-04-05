'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  createDocument,
  deleteDocument,
  renameDocument,
  updateDocument,
} from './documents';
import { revalidatePath } from 'next/cache';
import sql from './db';

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

export async function deleteAccountAction() {
  const { userId } = await auth();
  if (!userId) return;

  await sql`DELETE FROM documents WHERE user_id = ${userId}`;

  const clerk = await clerkClient();
  await clerk.users.deleteUser(userId);
}

export async function updateDisplayNameAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const name = formData.get('name') as string;
  if (!name?.trim()) return;

  const [firstName, ...rest] = name.trim().split(' ');
  const lastName = rest.join(' ');

  const clerk = await clerkClient();
  await clerk.users.updateUser(userId, { firstName, lastName });
  revalidatePath('/settings');
}
