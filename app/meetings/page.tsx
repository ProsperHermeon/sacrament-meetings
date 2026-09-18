import type { SacramentMeeting } from '@/lib/types';
import { getBaseUrl } from '@/lib/base-url';
import MeetingCard from '@/components/MeetingCard';

export const dynamic = 'force-dynamic';

export default async function MeetingsPage() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
  const meetings: SacramentMeeting[] = await res.json();

  return (
    <div>
      <h1 className="font-serif text-3xl text-[var(--ink)]">All Meetings</h1>
      <p className="mt-2 text-[var(--muted)]">
        Select a Sunday to view or print its program.
      </p>

      {meetings.length > 0 ? (
        <div className="mt-8">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-[var(--ink)]">No meetings have been scheduled yet.</p>
      )}
    </div>
  );
}
