'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

// Called from the login form via useActionState. Returns an error message
// string on failure; on success signIn redirects (throws internally).
export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/meetings',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Invalid email or password.';
    }
    throw error; // re-throw the redirect (and anything unexpected)
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
