import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMeetingById } from '@/lib/meetings-db';
import { formatMeetingDate, meetingTypeLabel } from '@/lib/format';
import MeetingDetail from '@/components/MeetingDetail';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    return { title: 'Meeting not found' };
  }

  return {
    title: formatMeetingDate(meeting.date),
    description: `${meetingTypeLabel(meeting.meetingType)} on ${formatMeetingDate(
      meeting.date
    )} — presiding: ${meeting.presiding}, conducting: ${meeting.conducting}.`,
  };
}

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);
  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
