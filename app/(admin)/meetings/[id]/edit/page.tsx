import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';
import { updateMeeting } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) notFound();

  const meeting = await getMeetingById(numericId);
  if (!meeting) notFound();

  const updateAction = updateMeeting.bind(null, meeting.id);

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-[var(--ink)]">Edit Meeting</h1>
      <MeetingForm action={updateAction} meeting={meeting} submitLabel="Save changes" />
    </div>
  );
}
