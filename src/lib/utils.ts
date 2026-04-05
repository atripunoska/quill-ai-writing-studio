export function getRelativeTime(date: Date): string {
  const diff = new Date(date).getTime() - Date.now();
  const minutes = Math.round(diff / (1000 * 60));
  const hours = Math.round(diff / (1000 * 60 * 60));
  const days = Math.round(diff / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minutes');
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hours');
  return rtf.format(days, 'days');
}

export function getWordCount(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
