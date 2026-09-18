import type { SacramentMeeting } from './types';

// Temporary in-memory data source for Week 02.
// Database-backed persistence and mutations arrive in later weeks.
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'testimony',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Bishop Daniel Reyes',
    announcements: [
      'Ward temple night is Thursday at 7:00 PM.',
      'Elders quorum service project Saturday at 9:00 AM.',
    ],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Sister Grace Mensah',
    wardBusiness: [
      { description: 'Sustaining of new Primary teacher, Brother Kwame Boateng.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [
      { name: 'Open Testimony Meeting', topic: 'Fast and testimony', type: 'speaker' },
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Brother Samuel Osei',
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Brother Thomas Adeyemi',
    announcements: ['Youth activity Wednesday at 6:30 PM.'],
    openingHymn: { number: 66, title: 'Rejoice, the Lord Is King!' },
    openingPrayer: 'Brother Isaac Cole',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 177, title: "'Tis Sweet to Sing the Matchless Love" },
    speakers: [
      { name: 'Sister Abigail Nkrumah', topic: 'The gift of repentance', type: 'speaker' },
      { name: 'Ward Choir', topic: 'I Stand All Amazed', type: 'musical-number' },
      { name: 'Brother Peter Danso', topic: 'Enduring in faith', type: 'speaker' },
    ],
    closingHymn: { number: 223, title: 'Have I Done Any Good?' },
    closingPrayer: 'Sister Ruth Owusu',
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'President Michael Larsen (Stake)',
    conducting: 'Bishop Daniel Reyes',
    announcements: ['Ministering interviews begin next week.'],
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Brother Daniel Appiah',
    wardBusiness: [
      { description: 'Release of Sister Mary Tetteh from the nursery with thanks.' },
      { description: 'Sustaining of Sister Joan Mills as nursery leader.' },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      { name: 'Brother Emmanuel Quaye', topic: 'Temple covenants', type: 'speaker' },
      { name: 'Sister Deborah Sarpong', topic: 'The power of the Atonement', type: 'speaker' },
    ],
    closingHymn: { number: 6, title: 'Redeemer of Israel' },
    closingPrayer: 'Brother John Amoah',
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Brother Thomas Adeyemi',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Esther Boadi',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Youth Speaker: Naomi Adjei', topic: 'Living the standards', type: 'speaker' },
      { name: 'Brother Caleb Mensah', topic: 'Missionary work', type: 'speaker' },
      { name: 'Sister Hannah Lartey', topic: 'Family history', type: 'speaker' },
    ],
    closingHymn: { number: 249, title: 'Called to Serve' },
    closingPrayer: 'Brother Philip Ansah',
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'stake',
    presiding: 'President Michael Larsen (Stake)',
    conducting: 'President Michael Larsen (Stake)',
    announcements: ['Stake conference broadcast from the stake center.'],
    openingHymn: { number: 42, title: 'Hail to the Brightness of Zion’s Glad Morning!' },
    openingPrayer: 'Brother Andrew Baffour',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 146, title: 'Gently Raise the Sacred Strain' },
    speakers: [
      { name: 'President Michael Larsen', topic: 'Building Zion in our homes', type: 'speaker' },
      { name: 'Stake Choir', topic: 'Come, Thou Fount of Every Blessing', type: 'musical-number' },
    ],
    closingHymn: { number: 62, title: 'All Creatures of Our God and King' },
    closingPrayer: 'Sister Patricia Yeboah',
  },
  {
    id: 6,
    date: '2026-06-07',
    meetingType: 'testimony',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Bishop Daniel Reyes',
    announcements: ['Fast offerings will be collected by the deacons.'],
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Brother Felix Owusu',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Open Testimony Meeting', topic: 'Fast and testimony', type: 'speaker' },
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Comfort Asante',
  },
];

/** Return all meetings, most recent first. Optional ISO date filter (YYYY-MM-DD). */
export function getMeetings(date?: string): SacramentMeeting[] {
  const all = [...meetings].sort((a, b) => b.date.localeCompare(a.date));
  if (date) {
    return all.filter((m) => m.date === date);
  }
  return all;
}

/** Return a single meeting by id, or undefined if not found. */
export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((m) => m.id === id);
}

/** Return the meeting on or most recently before the given date (defaults to today). */
export function getCurrentMeeting(referenceDate: Date = new Date()): SacramentMeeting | undefined {
  const iso = referenceDate.toISOString().slice(0, 10);
  const past = getMeetings().filter((m) => m.date <= iso);
  if (past.length > 0) return past[0];
  // If every meeting is in the future, return the earliest upcoming one.
  const upcoming = getMeetings().slice().reverse();
  return upcoming[0];
}
