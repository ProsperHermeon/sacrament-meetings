import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl py-12 text-center">
      <h1 className="font-serif text-3xl text-[var(--ink)]">Meeting not found</h1>
      <p className="mt-3 text-[var(--muted)]">
        We couldn&apos;t find a meeting with that id.
      </p>
      <Link href="/meetings" className="mt-6 inline-block text-[var(--accent)] hover:underline">
        ← Back to all meetings
      </Link>
    </div>
  );
}
