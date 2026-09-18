import { notFound } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';
import { getBaseUrl } from '@/lib/base-url';
import MeetingDetail from '@/components/MeetingDetail';

export const dynamic = 'force-dynamic';

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    notFound();
  }

  const meeting: SacramentMeeting = await res.json();
  return <MeetingDetail meeting={meeting} />;
}
