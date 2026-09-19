import { getMeetings, getMeetingsCount, PAGE_SIZE } from '@/lib/meetings-db';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';

export const dynamic = 'force-dynamic';

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [meetings, totalCount] = await Promise.all([
    getMeetings({ query, page: currentPage }),
    getMeetingsCount(query),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div>
      <h1 className="font-serif text-3xl text-[var(--ink)]">All Meetings</h1>
      <p className="mt-2 text-[var(--muted)]">
        Search by speaker, presiding, conducting, or meeting type.
      </p>

      <div className="mt-6">
        <MeetingSearch />
      </div>

      {meetings.length > 0 ? (
        <div className="mt-8">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-[var(--ink)]">
          No meetings match your search. Try a different term.
        </p>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}
