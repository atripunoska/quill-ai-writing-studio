import Link from 'next/link';
import StreamingDemo from './StreamingDemo';

export default function Hero() {
  return (
    <div className='landing-hero'>
      <div className='hero-left'>
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-8 h-px bg-quill' />
          <span className='font-mono text-[0.68rem] tracking-[0.18em] uppercase text-quill-deep'>
            AI Writing Studio
          </span>
        </div>
        <h1
          className='font-serif font-light leading-[1.05] tracking-[-0.01em] text-ink mb-7'
          style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)' }}
        >
          Write with an <em className='italic text-quill-deep'>intelligent</em>{' '}
          voice
        </h1>
        <p className='text-[1.05rem] leading-[1.7] text-ink-muted max-w-[400px] mb-12'>
          Quill pairs your ideas with AI that suggests, rewrites, and coaches —
          so you can focus on what only you can write.
        </p>
        <div className='flex items-center gap-4'>
          <Link
            href='/sign-up'
            className='text-sm font-medium px-8 py-3.5 bg-ink text-parchment rounded hover:bg-ink-soft transition-all hover:-translate-y-px hover:shadow-md'
          >
            Start writing free
          </Link>
          <Link
            href='/sign-in'
            className='text-sm px-6 py-3.5 border border-border text-ink-muted rounded hover:text-ink hover:border-border-strong transition-all'
          >
            Sign in
          </Link>
        </div>
      </div>

      <div className='hero-right'>
        <StreamingDemo />
      </div>
    </div>
  );
}
