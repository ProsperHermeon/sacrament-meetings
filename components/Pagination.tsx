'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const linkBase =
    'rounded border border-[var(--line)] px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';
  const enabled = 'text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]';
  const disabled = 'pointer-events-none opacity-40 text-[var(--muted)]';

  return (
    <nav
      aria-label="Meetings list pagination"
      className="mt-8 flex items-center justify-between print:hidden"
    >
      {hasPrev ? (
        <Link href={createPageUrl(currentPage - 1)} className={`${linkBase} ${enabled}`}>
          ← Previous
        </Link>
      ) : (
        <span className={`${linkBase} ${disabled}`}>← Previous</span>
      )}

      <span className="text-sm text-[var(--muted)]">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link href={createPageUrl(currentPage + 1)} className={`${linkBase} ${enabled}`}>
          Next →
        </Link>
      ) : (
        <span className={`${linkBase} ${disabled}`}>Next →</span>
      )}
    </nav>
  );
}
