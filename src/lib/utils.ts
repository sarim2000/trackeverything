// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export default function timeAgo(date: number): string {
  const seconds = Math.floor((Date.now() - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
}
