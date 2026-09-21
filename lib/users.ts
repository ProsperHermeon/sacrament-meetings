import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface DbUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
}

export async function getUserByEmail(email: string): Promise<DbUser | undefined> {
  const rows = (await sql`
    SELECT id, name, email, password_hash FROM users WHERE email = ${email}
  `) as DbUser[];
  return rows[0];
}
