import { useState, useCallback, useRef } from 'react';
import type { StreamStatus } from '@/types';

export function useStream() {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<StreamStatus>('idle');
  const abortControllerRef = useRef<AbortController | null>(null);

  const start = useCallback(async (prompt: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setOutput('');
    setStatus('streaming');

    try {
      const res = await fetch('/api/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) throw new Error('Stream request failed');

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value));
      }

      setStatus('done');
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setStatus('idle');
      } else {
        setStatus('error');
      }
    }
  }, []);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    setStatus('idle');
  }, []);

  const reset = useCallback(() => {
    setOutput('');
    setStatus('idle');
  }, []);

  return { output, status, start, cancel, reset };
}
