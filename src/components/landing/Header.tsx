import Link from 'next/link';

export default function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-14 bg-parchment/85 backdrop-blur-md border-b border-border'>
      <div className='font-serif text-2xl font-medium text-ink flex items-center gap-1.5'>
        Quill
        <span className='w-1.5 h-1.5 rounded-full bg-quill inline-block mb-1' />
      </div>
      <div className='flex items-center gap-2'>
        <Link
          href='/sign-in'
          className='text-sm text-ink-muted hover:text-ink transition-colors px-4 py-2'
        >
          Sign in
        </Link>
        <Link
          href='/sign-up'
          className='text-sm font-medium px-4 py-2 bg-ink text-parchment rounded hover:bg-ink-soft transition-colors'
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
