import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, meetingTypeLabel } from '@/lib/format';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const speakerCount = meeting.speakers.filter((s) => s.type === 'speaker').length;

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="group block border-l-2 border-[var(--line)] py-4 pl-5 transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
        {meetingTypeLabel(meeting.meetingType)}
      </p>
      <p className="mt-1 font-serif text-xl text-[var(--ink)] group-hover:text-[var(--accent)]">
        {formatMeetingDate(meeting.date)}
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Conducting: {meeting.conducting}
        {speakerCount > 0 && ` · ${speakerCount} speaker${speakerCount > 1 ? 's' : ''}`}
      </p>
    </Link>
  );
}
