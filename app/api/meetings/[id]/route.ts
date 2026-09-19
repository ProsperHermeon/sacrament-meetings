import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

// GET /api/meetings/[id]
// 200 with the meeting when found, 400 for a non-numeric id, 404 when not found.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return NextResponse.json(
      { error: 'The id parameter must be a valid number.' },
      { status: 400 }
    );
  }

  const meeting = await getMeetingById(numericId);
  if (!meeting) {
    return NextResponse.json(
      { error: `No meeting found with id ${numericId}.` },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}
