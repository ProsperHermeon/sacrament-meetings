import type { MeetingType } from './types';

const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
  testimony: 'Fast & Testimony',
  regular: 'Sacrament Meeting',
  stake: 'Stake Meeting',
  general: 'General Meeting',
  special: 'Special Meeting',
};

export function meetingTypeLabel(type: MeetingType): string {
  return MEETING_TYPE_LABELS[type] ?? type;
}

// Format an ISO date (YYYY-MM-DD) as e.g. "Sunday, May 3, 2026" without timezone drift.
export function formatMeetingDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
