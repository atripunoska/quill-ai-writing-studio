import sql from './db';

export type Document = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};

export async function getDocuments(userId: string): Promise<Document[]> {
  const docs = await sql<Document[]>`
    SELECT * FROM documents
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `;
  return docs;
}

export async function createDocument(userId: string): Promise<Document> {
  const [doc] = await sql<Document[]>`
    INSERT INTO documents (user_id, title, content)
    VALUES (${userId}, 'Untitled', '')
    RETURNING *
  `;
  return doc;
}

export async function getDocument(
  id: string,
  userId: string,
): Promise<Document | null> {
  const [doc] = await sql<Document[]>`
    SELECT * FROM documents
    WHERE id = ${id} AND user_id = ${userId}
  `;
  return doc ?? null;
}

export async function updateDocument(
  id: string,
  userId: string,
  data: { title?: string; content?: string },
): Promise<void> {
  await sql`
    UPDATE documents
    SET
      title = COALESCE(${data.title ?? null}, title),
      content = COALESCE(${data.content ?? null}, content),
      updated_at = NOW()
    WHERE id = ${id} AND user_id = ${userId}
  `;
}

export async function deleteDocument(
  id: string,
  userId: string,
): Promise<void> {
  await sql`
    DELETE FROM documents
    WHERE id = ${id} AND user_id = ${userId}
  `;
}

export async function renameDocument(
  id: string,
  userId: string,
  title: string,
): Promise<void> {
  await sql`
    UPDATE documents
    SET title = ${title}, updated_at = NOW()
    WHERE id = ${id} AND user_id = ${userId}
  `;
}
