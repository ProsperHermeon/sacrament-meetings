import { headers } from 'next/headers';

/** Build an absolute base URL for server-side fetches to our own API routes. */
export async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get('host') ?? 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}
