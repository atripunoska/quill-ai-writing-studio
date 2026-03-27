import { createTables } from '@/lib/schema';

export async function GET() {
  try {
    await createTables();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
