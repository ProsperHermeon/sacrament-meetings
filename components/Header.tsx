import Link from 'next/link';
import NavLinks from './NavLinks';
import { auth, signOut } from '@/auth';

const WARD_NAME = 'Riverside Ward';

export default async function Header() {
  const session = await auth();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="border-b border-[var(--line)] bg-[var(--paper)] print:hidden">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-2xl leading-none text-[var(--ink)]">
            {WARD_NAME}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">{today}</p>
        </div>
        <div className="flex items-center gap-6">
          <NavLinks />
          {session?.user ? (
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <button
                type="submit"
                className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
