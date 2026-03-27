export const mockDocs = [
  {
    id: '1',
    title: 'The Art of Slow Mornings',
    excerpt:
      'There is a particular quality of light in the early morning that feels borrowed from somewhere else, softer than it has any right to be...',
    words: '847 words',
    updated: '2 min ago',
  },
  {
    id: '2',
    title: 'On Solitude and Attention',
    excerpt:
      'Solitude, at its best, is not an absence but a presence — the presence of your own undivided attention, finally returned to you...',
    words: '1,204 words',
    updated: '1 hour ago',
  },
  {
    id: '3',
    title: 'Notes on Patience',
    excerpt:
      'The silence before the city wakes is not empty — it hums with a low, almost geological patience, as though the ground itself is deciding...',
    words: '523 words',
    updated: 'Yesterday',
  },
  {
    id: '4',
    title: 'Untitled',
    excerpt: 'Start writing something amazing...',
    words: '0 words',
    updated: '2 days ago',
  },
];

export type Doc = (typeof mockDocs)[0];
