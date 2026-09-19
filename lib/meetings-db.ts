import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

export const PAGE_SIZE = 5;

// Raw shape of a row returned from the meetings table (snake_case columns).
interface MeetingRow {
  id: number;
  date: string | Date;
  meeting_type: SacramentMeeting['meetingType'];
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: SacramentMeeting['openingHymn'];
  opening_prayer: string;
  ward_business: SacramentMeeting['wardBusiness'] | null;
  stake_business: boolean;
  sacrament_hymn: SacramentMeeting['sacramentHymn'];
  speakers: SacramentMeeting['speakers'] | null;
  closing_hymn: SacramentMeeting['closingHymn'];
  closing_prayer: string;
}

// Map a database row (snake_case, JSONB) onto the SacramentMeeting type.
function mapRow(row: MeetingRow): SacramentMeeting {
  const date =
    typeof row.date === 'string'
      ? row.date.slice(0, 10)
      : new Date(row.date).toISOString().slice(0, 10);

  return {
    id: row.id,
    date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

interface GetMeetingsOptions {
  date?: string;
  query?: string;
  page?: number;
}

// Read meetings. Supports an exact date filter (used by the API), a text search
// across presiding, conducting, meeting type, and speaker names, and optional
// pagination (PAGE_SIZE per page) when a page number is supplied.
export async function getMeetings(
  options: GetMeetingsOptions = {}
): Promise<SacramentMeeting[]> {
  const { date, query, page } = options;
  const like = `%${query ?? ''}%`;

  if (date) {
    const rows = (await sql`
      SELECT * FROM meetings WHERE date = ${date} ORDER BY date DESC
    `) as MeetingRow[];
    return rows.map(mapRow);
  }

  if (page && page > 0) {
    const offset = (page - 1) * PAGE_SIZE;
    const rows = (await sql`
      SELECT * FROM meetings
      WHERE presiding ILIKE ${like}
         OR conducting ILIKE ${like}
         OR meeting_type ILIKE ${like}
         OR speakers::text ILIKE ${like}
      ORDER BY date DESC
      LIMIT ${PAGE_SIZE} OFFSET ${offset}
    `) as MeetingRow[];
    return rows.map(mapRow);
  }

  const rows = (await sql`
    SELECT * FROM meetings
    WHERE presiding ILIKE ${like}
       OR conducting ILIKE ${like}
       OR meeting_type ILIKE ${like}
       OR speakers::text ILIKE ${like}
    ORDER BY date DESC
  `) as MeetingRow[];
  return rows.map(mapRow);
}

// Count meetings matching a search query (for pagination controls).
export async function getMeetingsCount(query?: string): Promise<number> {
  const like = `%${query ?? ''}%`;
  const rows = (await sql`
    SELECT COUNT(*)::int AS count FROM meetings
    WHERE presiding ILIKE ${like}
       OR conducting ILIKE ${like}
       OR meeting_type ILIKE ${like}
       OR speakers::text ILIKE ${like}
  `) as { count: number }[];
  return rows[0]?.count ?? 0;
}

// Read a single meeting by id.
export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const rows = (await sql`
    SELECT * FROM meetings WHERE id = ${id}
  `) as MeetingRow[];
  return rows[0] ? mapRow(rows[0]) : undefined;
}

// Return the meeting on or most recently before today; otherwise the earliest upcoming one.
export async function getCurrentMeeting(): Promise<
  SacramentMeeting | undefined
> {
  const past = (await sql`
    SELECT * FROM meetings WHERE date <= CURRENT_DATE ORDER BY date DESC LIMIT 1
  `) as MeetingRow[];
  if (past[0]) return mapRow(past[0]);

  const upcoming = (await sql`
    SELECT * FROM meetings ORDER BY date ASC LIMIT 1
  `) as MeetingRow[];
  return upcoming[0] ? mapRow(upcoming[0]) : undefined;
}

// --- Mutations: wired to the database in Week 04. Stubs for now. ---

export async function addMeeting(
  _meeting: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  throw new Error('addMeeting is not implemented until Week 04.');
}

export async function updateMeeting(
  _id: number,
  _meeting: Partial<SacramentMeeting>
): Promise<SacramentMeeting> {
  throw new Error('updateMeeting is not implemented until Week 04.');
}

export async function deleteMeeting(_id: number): Promise<void> {
  throw new Error('deleteMeeting is not implemented until Week 04.');
}
