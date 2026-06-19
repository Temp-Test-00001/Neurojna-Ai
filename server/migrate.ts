import dotenv from 'dotenv';
dotenv.config();

import { initDB, pool } from './db';

async function migrate() {
  try {
    await initDB();
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

migrate();
