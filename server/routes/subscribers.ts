import { Router } from 'express';
import { pool } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

// POST /api/subscribers — public
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  try {
    const existing = await pool.query(
      'SELECT id FROM subscribers WHERE email = $1',
      [email]
    );
    if (existing.rowCount && existing.rowCount > 0) {
      return res.status(409).json({ error: 'Already subscribed' });
    }
    await pool.query(
      'INSERT INTO subscribers (email) VALUES ($1)',
      [email]
    );
    res.status(201).json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/subscribers — admin only
router.get('/', requireAuth, async (_req, res) => {
  const result = await pool.query('SELECT * FROM subscribers ORDER BY created_at DESC');
  res.json({ data: result.rows, total: result.rowCount });
});

// DELETE /api/subscribers/:id — admin only
router.delete('/:id', requireAuth, async (req, res) => {
  const result = await pool.query('DELETE FROM subscribers WHERE id=$1', [req.params.id]);
  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ success: true });
});

export default router;
