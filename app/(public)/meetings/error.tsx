'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl py-12 text-center">
      <h1 className="font-serif text-3xl text-[var(--ink)]">Something went wrong</h1>
      <p className="mt-3 text-[var(--muted)]">
        We couldn&apos;t load the meetings just now. Please try again.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded bg-[var(--accent)] px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <Link href="/meetings" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">
          Back to all meetings
        </Link>
      </div>
    </div>
  );
}
