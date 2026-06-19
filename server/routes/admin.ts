import { Router } from 'express';
import { pool } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Protect all routes in this router with JWT auth
router.use(requireAuth);

// GET /api/admin/contacts — list all contact submissions ordered by date desc
router.get('/contacts', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM enquiries ORDER BY created_at DESC'
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// DELETE /api/admin/contacts/:id — delete a contact submission by id
router.delete('/contacts/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM enquiries WHERE id = $1',
      [req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// GET /api/admin/newsletter — list all newsletter subscribers ordered by date desc
router.get('/newsletter', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM subscribers ORDER BY created_at DESC'
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

// DELETE /api/admin/newsletter/:id — delete a newsletter subscriber by id
router.delete('/newsletter/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM subscribers WHERE id = $1',
      [req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete subscriber' });
  }
});

export default router;
