'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/auth-actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const inputClass =
    'mt-1 w-full rounded border border-[var(--line)] bg-white px-3 py-2 text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';

  return (
    <form action={formAction} className="mx-auto max-w-sm space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--ink)]">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email"
          className={inputClass} />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[var(--ink)]">
          Password
        </label>
        <input id="password" name="password" type="password" required
          autoComplete="current-password" minLength={6} className={inputClass} />
      </div>

      <div aria-live="polite" aria-atomic="true">
        {errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}
      </div>

      <button type="submit" disabled={isPending}
        className="w-full rounded bg-[var(--accent)] px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
