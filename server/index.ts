import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { initDB, pool } from './db';
import authRoutes from './routes/auth';
import enquiryRoutes from './routes/enquiries';
import subscriberRoutes from './routes/subscribers';
import statsRoutes from './routes/stats';
import adminRoutes from './routes/admin';

dotenv.config();

// --- Environment variable validation (Req 6.5) ---
const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'JWT_SECRET',
  'GMAIL_USER',
  'GMAIL_APP_PASSWORD',
] as const;

const missing: string[] = REQUIRED_ENV_VARS.filter((v) => !process.env[v]);

// ADMIN_EMAIL and NOTIFY_EMAIL are aliases; at least one must be present
if (!process.env.ADMIN_EMAIL && !process.env.NOTIFY_EMAIL) {
  missing.push('ADMIN_EMAIL (or NOTIFY_EMAIL)');
}

if (missing.length > 0) {
  missing.forEach((v) =>
    console.error(`❌ Missing required environment variable: ${v}`)
  );
  process.exit(1);
}
// --------------------------------------------------

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.APP_URL || 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/auth',        authRoutes);
app.use('/api/enquiries',   enquiryRoutes);
app.use('/api/contact',     enquiryRoutes);   // alias required by spec (Req 1.1)
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/newsletter',  subscriberRoutes);  // alias required by spec (Req 2.1)
app.use('/api/stats',       statsRoutes);
app.use('/api/admin',       adminRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'changeme123';
  const existing = await pool.query('SELECT id FROM admins WHERE username=$1', [username]);
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO admins (username, password_hash) VALUES ($1,$2)', [username, hash]);
    console.log(`✅ Admin seeded — username: ${username}`);
  }
}

async function start() {
  await initDB();
  await seedAdmin();
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

start().catch(console.error);
