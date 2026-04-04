export default function Footer() {
  return (
    <footer className='border-t border-border px-10 py-6 flex items-center justify-between'>
      <div className='font-serif text-lg font-medium text-ink flex items-center gap-1.5'>
        Quill
        <span className='w-1.5 h-1.5 rounded-full bg-quill inline-block mb-1' />
      </div>
      <p className='font-mono text-[0.62rem] text-ink-ghost tracking-widest uppercase'>
        Built with Next.js · Anthropic · Tiptap
      </p>
    </footer>
  );
}
