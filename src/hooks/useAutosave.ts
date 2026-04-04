import { SaveStatus } from '@/types';
import { useCallback, useRef, useState } from 'react';

export function useAutosave(
  saveFn: (data: { title?: string; content?: string }) => Promise<void>,
) {
  const [status, setStatus] = useState<SaveStatus>('saved');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(
    (data: { title?: string; content?: string }) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setStatus('unsaved');
      timerRef.current = setTimeout(async () => {
        setStatus('saving');
        await saveFn(data);
        setStatus('saved');
      }, 1000);
    },
    [saveFn],
  );

  return { status, save };
}
