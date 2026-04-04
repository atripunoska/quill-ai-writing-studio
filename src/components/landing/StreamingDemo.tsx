'use client';

import { STREAMING_DEMO_LINES } from '@/lib/constants';
import { useEffect, useRef, useState } from 'react';

export default function StreamingDemo() {
  const [text, setText] = useState('');
  const lineIdx = useRef(0);
  const charIdx = useRef(0);

  useEffect(() => {
    function typeNext() {
      const currentLine = STREAMING_DEMO_LINES[lineIdx.current];
      if (charIdx.current < currentLine.length) {
        setText(currentLine.slice(0, ++charIdx.current));
        setTimeout(typeNext, 28 + Math.random() * 20);
      } else {
        setTimeout(() => {
          lineIdx.current = (lineIdx.current + 1) % STREAMING_DEMO_LINES.length;
          charIdx.current = 0;
          setText('');
          typeNext();
        }, 3000);
      }
    }
    typeNext();
  }, []);

  return (
    <div className='streaming-demo'>
      <div className='flex items-center gap-2 mb-5'>
        <div className='w-1.5 h-1.5 rounded-full bg-ai-glow animate-pulse' />
        <span className='font-mono text-[0.62rem] tracking-[0.14em] uppercase text-ai-glow'>
          AI Writing
        </span>
      </div>
      <p className='text-[0.8rem] text-ink-muted italic mb-4 pb-4 border-b border-border'>
        &quot;Continue writing about the quality of solitude...&quot;
      </p>
      <p className='font-serif text-[1.05rem] leading-[1.8] text-ink min-h-[80px]'>
        {text}
        <span className='inline-block w-0.5 h-[1.1em] bg-ai-glow ml-px align-text-bottom animate-pulse' />
      </p>
    </div>
  );
}
