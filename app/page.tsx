import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <section className="grid items-center gap-8 sm:grid-cols-2">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-[var(--ink)]">
            Plan the Sabbath with reverence and order.
          </h1>
          <p className="mt-4 text-[var(--muted)]">
            A quiet workspace for the bishopric to prepare each week&apos;s
            sacrament meeting — hymns, prayers, speakers, and ward business,
            ready to review and print.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/meetings"
              className="rounded bg-[var(--accent)] px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              View all meetings
            </Link>
            <Link
              href="/meetings/current"
              className="rounded border border-[var(--line)] px-5 py-2.5 text-sm text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              This Sunday&apos;s program
            </Link>
          </div>
        </div>
        <Image
          src="/chapel.svg"
          alt="Illustration of a meetinghouse with a steeple"
          width={960}
          height={540}
          priority
          className="h-auto w-full rounded"
        />
      </section>
    </div>
  );
}
