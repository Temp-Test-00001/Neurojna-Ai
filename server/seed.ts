import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import { pool } from './db';

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'changeme123';

  const existing = await pool.query('SELECT id FROM admins WHERE username=$1', [username]);
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO admins (username, password_hash) VALUES ($1,$2)', [username, hash]);
    console.log(`✅ Admin seeded — username: ${username}`);
  } else {
    console.log(`ℹ️  Admin already exists — username: ${username}`);
  }
}

async function seed() {
  try {
    await seedAdmin();
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

seed();
