import type { Doc } from '@/lib/mock-data';

export default function Sidebar({ docs }: { docs: Doc[] }) {
  return (
    <aside className='w-60 shrink-0 flex flex-col h-screen bg-parchment-warm border-r border-border'>
      <div className='p-5 border-b border-border'>
        <div className='font-serif text-xl font-medium text-ink flex items-center gap-1 mb-4'>
          Quill
          <span className='w-1.5 h-1.5 rounded-full bg-quill inline-block mb-1' />
        </div>
        <button className='w-full text-sm font-medium font-sans px-4 py-2.5 bg-ink text-parchment rounded cursor-pointer hover:bg-ink-soft transition-colors'>
          + New Document
        </button>
      </div>

      <div className='p-4 border-b border-border'>
        <input
          placeholder='Search documents...'
          className='w-full px-3 py-2 text-sm font-sans bg-surface-raised border border-border rounded text-ink placeholder:text-ink-ghost outline-none focus:border-quill transition-colors'
        />
      </div>

      <div className='px-5 pt-4 pb-2 font-mono text-[0.6rem] tracking-widest uppercase text-ink-ghost'>
        Recent
      </div>

      <div className='flex-1 overflow-y-auto'>
        {docs.map((doc, i) => (
          <div
            key={doc.id}
            className={`px-5 py-3 cursor-pointer border-l-2 transition-all ${
              i === 0
                ? 'border-quill bg-quill/10'
                : 'border-transparent hover:bg-quill/5'
            }`}
          >
            <div className='text-sm font-medium text-ink truncate mb-0.5'>
              {doc.title}
            </div>
            <div className='font-mono text-[0.62rem] text-ink-ghost'>
              {doc.updated}
            </div>
          </div>
        ))}
      </div>

      <div className='p-4 border-t border-border'>
        <div className='flex items-center gap-2.5 cursor-pointer'>
          <div className='w-8 h-8 rounded-full bg-gradient-to-br from-quill to-ai-glow flex items-center justify-center text-xs font-semibold text-white shrink-0'>
            U
          </div>
          <div>
            <div className='text-sm font-medium text-ink'>My Account</div>
            <div className='text-[0.68rem] text-ink-ghost'>Settings</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
