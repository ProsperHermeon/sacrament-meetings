import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm print:hidden">
        <Link
          href="/meetings"
          className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          All Meetings
        </Link>
        <span className="text-[var(--line)]">/</span>
        <Link
          href="/meetings/current"
          className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          This Sunday
        </Link>
      </div>
      {children}
    </div>
  );
}
