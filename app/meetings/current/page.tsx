import { redirect } from 'next/navigation';
import { getCurrentMeeting } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export default function CurrentMeetingPage() {
  const meeting = getCurrentMeeting();

  if (!meeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${meeting.id}`);
}
