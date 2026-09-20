'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createMeeting as dbCreateMeeting,
  updateMeeting as dbUpdateMeeting,
  deleteMeeting as dbDeleteMeeting,
} from './meetings-db';
import type { MeetingInput } from './meetings-db';
import type { SpeakerItem, WardBusinessItem } from './types';

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special'], {
    message: 'Select a valid meeting type.',
  }),
  presiding: z.string().min(1, 'Presiding is required.'),
  conducting: z.string().min(1, 'Conducting is required.'),
  openingHymnNumber: z.coerce.number().int().min(1, 'Enter an opening hymn number.'),
  openingHymnTitle: z.string().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().min(1, 'Opening prayer is required.'),
  sacramentHymnNumber: z.coerce.number().int().min(1, 'Enter a sacrament hymn number.'),
  sacramentHymnTitle: z.string().min(1, 'Sacrament hymn title is required.'),
  closingHymnNumber: z.coerce.number().int().min(1, 'Enter a closing hymn number.'),
  closingHymnTitle: z.string().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().min(1, 'Closing prayer is required.'),
  stakeBusiness: z.boolean(),
  announcements: z.string().optional(),
  wardBusiness: z.string().optional(),
  speakers: z.string().optional(),
});

// Split a textarea value into trimmed, non-empty lines.
function lines(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

// Parse "Name - Topic" lines into speaker items (all treated as speakers).
function parseSpeakers(value: string | undefined): SpeakerItem[] {
  return lines(value).map((line) => {
    const [name, ...rest] = line.split(' - ');
    return {
      name: name.trim(),
      topic: rest.join(' - ').trim(),
      type: 'speaker' as const,
    };
  });
}

// Read and validate the raw form values, returning either an error State or the parsed input.
function parseForm(
  formData: FormData
): { ok: true; data: MeetingInput } | { ok: false; state: State } {
  const raw = {
    date: String(formData.get('date') ?? ''),
    meetingType: String(formData.get('meetingType') ?? ''),
    presiding: String(formData.get('presiding') ?? ''),
    conducting: String(formData.get('conducting') ?? ''),
    openingHymnNumber: String(formData.get('openingHymnNumber') ?? ''),
    openingHymnTitle: String(formData.get('openingHymnTitle') ?? ''),
    openingPrayer: String(formData.get('openingPrayer') ?? ''),
    sacramentHymnNumber: String(formData.get('sacramentHymnNumber') ?? ''),
    sacramentHymnTitle: String(formData.get('sacramentHymnTitle') ?? ''),
    closingHymnNumber: String(formData.get('closingHymnNumber') ?? ''),
    closingHymnTitle: String(formData.get('closingHymnTitle') ?? ''),
    closingPrayer: String(formData.get('closingPrayer') ?? ''),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    announcements: String(formData.get('announcements') ?? ''),
    wardBusiness: String(formData.get('wardBusiness') ?? ''),
    speakers: String(formData.get('speakers') ?? ''),
  };

  const result = MeetingFormSchema.safeParse(raw);
  if (!result.success) {
    return {
      ok: false,
      state: {
        errors: z.flattenError(result.error).fieldErrors,
        message: 'Some fields need attention. Please review and try again.',
      },
    };
  }

  const v = result.data;
  const wardBusiness: WardBusinessItem[] = lines(v.wardBusiness).map(
    (description) => ({ description })
  );

  const data: MeetingInput = {
    date: v.date,
    meetingType: v.meetingType,
    presiding: v.presiding,
    conducting: v.conducting,
    announcements: lines(v.announcements),
    openingHymn: { number: v.openingHymnNumber, title: v.openingHymnTitle },
    openingPrayer: v.openingPrayer,
    wardBusiness,
    stakeBusiness: v.stakeBusiness,
    sacramentHymn: { number: v.sacramentHymnNumber, title: v.sacramentHymnTitle },
    speakers: parseSpeakers(v.speakers),
    closingHymn: { number: v.closingHymnNumber, title: v.closingHymnTitle },
    closingPrayer: v.closingPrayer,
  };

  return { ok: true, data };
}

export async function createMeeting(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const parsed = parseForm(formData);
  if (!parsed.ok) return parsed.state;

  try {
    await dbCreateMeeting(parsed.data);
  } catch (error) {
    console.error('Failed to create meeting:', error);
    return { message: 'Database error: could not create the meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: State,
  formData: FormData
): Promise<State> {
  const parsed = parseForm(formData);
  if (!parsed.ok) return parsed.state;

  try {
    await dbUpdateMeeting(id, parsed.data);
  } catch (error) {
    console.error('Failed to update meeting:', error);
    return { message: 'Database error: could not update the meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    await dbDeleteMeeting(id);
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('Database error: could not delete the meeting.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
