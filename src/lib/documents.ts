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
