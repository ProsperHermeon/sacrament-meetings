import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

export const PAGE_SIZE = 5;

// Fields needed to create or update a meeting (everything except the id).
export type MeetingInput = Omit<SacramentMeeting, 'id'>;

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

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const rows = (await sql`
    SELECT * FROM meetings WHERE id = ${id}
  `) as MeetingRow[];
  return rows[0] ? mapRow(rows[0]) : undefined;
}

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

// --- Mutations (live SQL) ---

export async function createMeeting(data: MeetingInput): Promise<void> {
  await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${data.date}, ${data.meetingType}, ${data.presiding}, ${data.conducting},
      ${data.announcements ?? []},
      ${JSON.stringify(data.openingHymn)}::jsonb, ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)}::jsonb, ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)}::jsonb,
      ${JSON.stringify(data.speakers)}::jsonb,
      ${JSON.stringify(data.closingHymn)}::jsonb, ${data.closingPrayer}
    )
  `;
}

export async function updateMeeting(
  id: number,
  data: MeetingInput
): Promise<void> {
  await sql`
    UPDATE meetings SET
      date = ${data.date},
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ${data.announcements ?? []},
      opening_hymn = ${JSON.stringify(data.openingHymn)}::jsonb,
      opening_prayer = ${data.openingPrayer},
      ward_business = ${JSON.stringify(data.wardBusiness)}::jsonb,
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(data.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(data.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(data.closingHymn)}::jsonb,
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
  `;
}

export async function deleteMeeting(id: number): Promise<void> {
  await sql`DELETE FROM meetings WHERE id = ${id}`;
}
