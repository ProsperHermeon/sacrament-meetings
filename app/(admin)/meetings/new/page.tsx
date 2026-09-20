import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-[var(--ink)]">Create Meeting</h1>
      <MeetingForm action={createMeeting} submitLabel="Create meeting" />
    </div>
  );
}
