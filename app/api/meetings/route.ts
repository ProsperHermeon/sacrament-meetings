import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

// GET /api/meetings          → all meetings
// GET /api/meetings?date=... → meetings on a specific ISO date
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date') ?? undefined;
  const meetings = getMeetings(date);
  return NextResponse.json(meetings);
}
