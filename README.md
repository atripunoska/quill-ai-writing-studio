# Quill — AI Writing Studio

A smart writing application where users write and an AI collaborates in real time. Contains suggesting continuations, rewriting sections in different tones and giving structured feedback.

**Live demo:** [quill-ai-writing-studio.vercel.app](https://quill-ai-writing-studio.vercel.app)

---

## Tech Stack

| Layer     | Choice                    | Why                                                              |
| --------- | ------------------------- | ---------------------------------------------------------------- |
| Framework | Next.js 16 (App Router)   | RSC support, Route Handlers for streaming                        |
| Language  | TypeScript 5              | Type safety across client, server, and AI payloads               |
| Editor    | Tiptap                    | React-native rich text, extensible, programmatic content control |
| State     | Zustand                   | Lightweight, slice-based subscriptions, no re-render storms      |
| AI        | Anthropic API (raw fetch) | No SDK wrappers — direct SSE protocol implementation             |
| Database  | Neon PostgreSQL           | Serverless Postgres, connection pooling with Next.js             |
| Auth      | Clerk                     | Next.js integration via proxy.ts, session management             |
| Styling   | Tailwind CSS v4           | CSS-first theme with custom design tokens via @theme             |

---

## Architecture

### RSC Boundaries

Pages and data fetching are server components. Interactive UI is isolated into client islands.

```
app/
  (dashboard)/
    dashboard/page.tsx     ← Server Component — fetches documents
    editor/[id]/page.tsx   ← Server Component — fetches document by id
    settings/page.tsx      ← Server Component — fetches Clerk user

components/
  dashboard/
    Sidebar.tsx            ← Client Component — search state
    DocCard.tsx            ← Client Component — rename, delete interactions
    DocsList.tsx           ← Client Component — sort state
  editor/
    Editor.tsx             ← Client Component — Tiptap, autosave
    AIPanel.tsx            ← Client Component — tab state via Zustand
    SuggestTab.tsx         ← Client Component — streaming
    RewriteTab.tsx         ← Client Component — streaming, selection
    CoachTab.tsx           ← Client Component — streaming
```

### Streaming Architecture

AI responses stream via Server-Sent Events (SSE) parsed manually with `ReadableStream`:

```
Client → POST /api/stream
       → Anthropic API (stream: true)
       → SSE lines parsed (data: {...})
       → ReadableStream → client
       → useStream hook → setState token by token
```

No Vercel AI SDK. The SSE parsing, `AbortController` cancellation, and stream state management are all implemented from scratch.

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/yourusername/quill-ai-writing-studio.git
cd quill-ai-writing-studio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in the values in .env.local

# Run the development server
npm run dev
```

### Required Environment Variables

```
DATABASE_URL
ANTHROPIC_API_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

---

## Project Structure

```
src/
  app/
    (auth)/              # Clerk sign-in, sign-up pages
    (dashboard)/         # Protected routes
      dashboard/         # Document grid
      editor/[id]/       # Tiptap editor
      settings/          # Profile and account
    api/stream/          # Streaming Route Handler
  components/
    dashboard/           # DocCard, DocGrid, Sidebar, DocsList
    editor/              # Editor, AIPanel, all tabs
    landing/             # Hero, Features, StreamingDemo
    settings/            # SettingsProfile, SettingsDangerZone
  hooks/
    useStream.ts         # Core streaming hook with AbortController
    useAutosave.ts       # Debounced autosave with save status
  lib/
    ai/prompts.ts        # AI prompt templates
    actions.ts           # Next.js Server Actions
    constants.ts         # Shared constants
    db.ts                # Neon database client
    documents.ts         # Document CRUD functions
    utils.ts             # getRelativeTime, getWordCount
  stores/
    useAIStore.ts        # AI panel state
    useDocumentStore.ts  # Document title and content state
  types/
    index.ts             # Shared TypeScript types
```
