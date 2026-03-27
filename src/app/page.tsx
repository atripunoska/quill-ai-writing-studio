'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleStream() {
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setResponse((prev) => prev + decoder.decode(value));
    }

    setLoading(false);
  }

  return (
    <div className='flex flex-col gap-4 max-w-2xl mx-auto p-8'>
      <h1 className='text-2xl font-bold'>Quill — Stream Test</h1>
      <textarea
        className='border rounded p-2 h-32'
        placeholder='Enter a prompt...'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className='bg-black text-white rounded px-4 py-2'
        onClick={handleStream}
        disabled={loading}
      >
        {loading ? 'Streaming...' : 'Send'}
      </button>
      <div className='border rounded p-4 min-h-32 whitespace-pre-wrap'>
        {response}
      </div>
    </div>
  );
}
