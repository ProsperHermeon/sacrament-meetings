'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import type { State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingFormProps {
  action: (prevState: State, formData: FormData) => Promise<State>;
  meeting?: SacramentMeeting;
  submitLabel: string;
}

const initialState: State = { message: null, errors: {} };

const meetingTypes = [
  { value: 'regular', label: 'Sacrament Meeting' },
  { value: 'testimony', label: 'Fast & Testimony' },
  { value: 'stake', label: 'Stake Meeting' },
  { value: 'general', label: 'General Meeting' },
  { value: 'special', label: 'Special Meeting' },
];

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <p id={id} aria-live="polite" className="mt-1 text-sm text-red-700">
      {errors?.map((e) => <span key={e}>{e}</span>)}
    </p>
  );
}

export default function MeetingForm({
  action,
  meeting,
  submitLabel,
}: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const e = state.errors ?? {};

  const inputClass =
    'mt-1 w-full rounded border border-[var(--line)] bg-white px-3 py-2 text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';
  const labelClass = 'block text-sm font-medium text-[var(--ink)]';

  return (
    <form action={formAction} className="mx-auto max-w-2xl space-y-5">
      {state.message && (
        <p aria-live="polite" className="rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="date" className={labelClass}>Date</label>
        <input id="date" name="date" type="date" defaultValue={meeting?.date}
          aria-describedby="date-error" className={inputClass} />
        <FieldError id="date-error" errors={e.date} />
      </div>

      <div>
        <label htmlFor="meetingType" className={labelClass}>Meeting Type</label>
        <select id="meetingType" name="meetingType" defaultValue={meeting?.meetingType ?? 'regular'}
          aria-describedby="meetingType-error" className={inputClass}>
          {meetingTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <FieldError id="meetingType-error" errors={e.meetingType} />
      </div>

      <div>
        <label htmlFor="presiding" className={labelClass}>Presiding</label>
        <input id="presiding" name="presiding" defaultValue={meeting?.presiding}
          aria-describedby="presiding-error" className={inputClass} />
        <FieldError id="presiding-error" errors={e.presiding} />
      </div>

      <div>
        <label htmlFor="conducting" className={labelClass}>Conducting</label>
        <input id="conducting" name="conducting" defaultValue={meeting?.conducting}
          aria-describedby="conducting-error" className={inputClass} />
        <FieldError id="conducting-error" errors={e.conducting} />
      </div>

      <fieldset className="grid grid-cols-3 gap-3">
        <legend className="text-sm font-medium text-[var(--ink)]">Opening Hymn</legend>
        <div>
          <label htmlFor="openingHymnNumber" className={labelClass}>Number</label>
          <input id="openingHymnNumber" name="openingHymnNumber" type="number"
            defaultValue={meeting?.openingHymn.number} aria-describedby="openingHymnNumber-error" className={inputClass} />
          <FieldError id="openingHymnNumber-error" errors={e.openingHymnNumber} />
        </div>
        <div className="col-span-2">
          <label htmlFor="openingHymnTitle" className={labelClass}>Title</label>
          <input id="openingHymnTitle" name="openingHymnTitle" defaultValue={meeting?.openingHymn.title}
            aria-describedby="openingHymnTitle-error" className={inputClass} />
          <FieldError id="openingHymnTitle-error" errors={e.openingHymnTitle} />
        </div>
      </fieldset>

      <div>
        <label htmlFor="openingPrayer" className={labelClass}>Opening Prayer</label>
        <input id="openingPrayer" name="openingPrayer" defaultValue={meeting?.openingPrayer}
          aria-describedby="openingPrayer-error" className={inputClass} />
        <FieldError id="openingPrayer-error" errors={e.openingPrayer} />
      </div>

      <fieldset className="grid grid-cols-3 gap-3">
        <legend className="text-sm font-medium text-[var(--ink)]">Sacrament Hymn</legend>
        <div>
          <label htmlFor="sacramentHymnNumber" className={labelClass}>Number</label>
          <input id="sacramentHymnNumber" name="sacramentHymnNumber" type="number"
            defaultValue={meeting?.sacramentHymn.number} aria-describedby="sacramentHymnNumber-error" className={inputClass} />
          <FieldError id="sacramentHymnNumber-error" errors={e.sacramentHymnNumber} />
        </div>
        <div className="col-span-2">
          <label htmlFor="sacramentHymnTitle" className={labelClass}>Title</label>
          <input id="sacramentHymnTitle" name="sacramentHymnTitle" defaultValue={meeting?.sacramentHymn.title}
            aria-describedby="sacramentHymnTitle-error" className={inputClass} />
          <FieldError id="sacramentHymnTitle-error" errors={e.sacramentHymnTitle} />
        </div>
      </fieldset>

      <fieldset className="grid grid-cols-3 gap-3">
        <legend className="text-sm font-medium text-[var(--ink)]">Closing Hymn</legend>
        <div>
          <label htmlFor="closingHymnNumber" className={labelClass}>Number</label>
          <input id="closingHymnNumber" name="closingHymnNumber" type="number"
            defaultValue={meeting?.closingHymn.number} aria-describedby="closingHymnNumber-error" className={inputClass} />
          <FieldError id="closingHymnNumber-error" errors={e.closingHymnNumber} />
        </div>
        <div className="col-span-2">
          <label htmlFor="closingHymnTitle" className={labelClass}>Title</label>
          <input id="closingHymnTitle" name="closingHymnTitle" defaultValue={meeting?.closingHymn.title}
            aria-describedby="closingHymnTitle-error" className={inputClass} />
          <FieldError id="closingHymnTitle-error" errors={e.closingHymnTitle} />
        </div>
      </fieldset>

      <div>
        <label htmlFor="closingPrayer" className={labelClass}>Closing Prayer</label>
        <input id="closingPrayer" name="closingPrayer" defaultValue={meeting?.closingPrayer}
          aria-describedby="closingPrayer-error" className={inputClass} />
        <FieldError id="closingPrayer-error" errors={e.closingPrayer} />
      </div>

      <div className="flex items-center gap-2">
        <input id="stakeBusiness" name="stakeBusiness" type="checkbox" defaultChecked={meeting?.stakeBusiness}
          className="h-4 w-4" />
        <label htmlFor="stakeBusiness" className={labelClass}>Includes stake business</label>
      </div>

      <div>
        <label htmlFor="announcements" className={labelClass}>Announcements (one per line)</label>
        <textarea id="announcements" name="announcements" rows={3}
          defaultValue={meeting?.announcements?.join('\n')} className={inputClass} />
      </div>

      <div>
        <label htmlFor="wardBusiness" className={labelClass}>Ward Business (one per line)</label>
        <textarea id="wardBusiness" name="wardBusiness" rows={2}
          defaultValue={meeting?.wardBusiness.map((w) => w.description).join('\n')} className={inputClass} />
      </div>

      <div>
        <label htmlFor="speakers" className={labelClass}>Speakers (one per line, format: Name - Topic)</label>
        <textarea id="speakers" name="speakers" rows={3}
          defaultValue={meeting?.speakers.map((s) => `${s.name} - ${s.topic}`).join('\n')} className={inputClass} />
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={isPending}
          className="rounded bg-[var(--accent)] px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
          {isPending ? 'Saving…' : submitLabel}
        </button>
        <Link href="/meetings" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">
          Cancel
        </Link>
      </div>
    </form>
  );
}
