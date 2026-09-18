import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, meetingTypeLabel } from '@/lib/format';
import PrintButton from './PrintButton';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function HymnLine({ label, hymn }: { label: string; hymn: { number: number; title: string } }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--line)] py-2">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="text-[var(--ink)]">
        <span className="tabular-nums text-[var(--muted)]">#{hymn.number}</span>{' '}
        {hymn.title}
      </span>
    </div>
  );
}

function ProgramRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--line)] py-2">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="text-[var(--ink)]">{value}</span>
    </div>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const speakers = meeting.speakers.filter((s) => s.type === 'speaker');
  const musicalNumbers = meeting.speakers.filter((s) => s.type === 'musical-number');

  return (
    <article className="mx-auto max-w-2xl">
      <header className="text-center">
        <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
          {meetingTypeLabel(meeting.meetingType)}
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[var(--ink)]">
          {formatMeetingDate(meeting.date)}
        </h1>
      </header>

      <div className="mt-8">
        <ProgramRow label="Presiding" value={meeting.presiding} />
        <ProgramRow label="Conducting" value={meeting.conducting} />
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mt-8">
          <h2 className="font-serif text-lg text-[var(--ink)]">Announcements</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--ink)]">
            {meeting.announcements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-serif text-lg text-[var(--ink)]">Program</h2>
        <div className="mt-2">
          <HymnLine label="Opening Hymn" hymn={meeting.openingHymn} />
          <ProgramRow label="Opening Prayer" value={meeting.openingPrayer} />

          <div className="py-2">
            <p className="text-[var(--muted)]">Ward Business</p>
            {meeting.wardBusiness.length > 0 ? (
              <ul className="mt-1 list-disc space-y-1 pl-5 text-[var(--ink)]">
                {meeting.wardBusiness.map((item, i) => (
                  <li key={i}>{item.description}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-[var(--ink)]">None</p>
            )}
            <p className="mt-2 text-sm text-[var(--muted)]">
              Stake business: {meeting.stakeBusiness ? 'Yes' : 'No'}
            </p>
          </div>

          <HymnLine label="Sacrament Hymn" hymn={meeting.sacramentHymn} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-lg text-[var(--ink)]">Speakers</h2>
        {speakers.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {speakers.map((s, i) => (
              <li key={i} className="border-b border-[var(--line)] py-2">
                <p className="text-[var(--ink)]">{s.name}</p>
                <p className="text-sm text-[var(--muted)]">{s.topic}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-[var(--ink)]">To be announced</p>
        )}
      </section>

      {musicalNumbers.length > 0 && (
        <section className="mt-8">
          <h2 className="font-serif text-lg text-[var(--ink)]">Musical Numbers</h2>
          <ul className="mt-2 space-y-2">
            {musicalNumbers.map((s, i) => (
              <li key={i} className="border-b border-[var(--line)] py-2">
                <p className="text-[var(--ink)]">{s.name}</p>
                <p className="text-sm text-[var(--muted)]">{s.topic}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <HymnLine label="Closing Hymn" hymn={meeting.closingHymn} />
        <ProgramRow label="Closing Prayer" value={meeting.closingPrayer} />
      </section>

      <div className="mt-10 flex justify-center">
        <PrintButton />
      </div>
    </article>
  );
}
