import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to manage the ward sacrament meeting schedule and program details.',
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center">
        <h1 className="font-serif text-3xl text-[var(--ink)]">Leader Sign In</h1>
        <p className="mt-2 text-[var(--muted)]">
          Bishopric access to create and edit sacrament meetings.
        </p>
      </div>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
