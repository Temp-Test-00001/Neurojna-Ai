import { Router } from 'express';
import { pool } from '../db';
import { sendEnquiryNotification, sendEnquiryConfirmation } from '../mailer';
import { requireAuth } from '../middleware/auth';

const router = Router();

// POST /api/enquiries — public
router.post('/', async (req, res) => {
  const { name, email, company, service, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO enquiries (name, email, company, service, message)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, email, company || null, service || null, message]
    );

    // Fire emails (non-blocking)
    sendEnquiryNotification({ name, email, company, service, message }).catch(console.error);
    sendEnquiryConfirmation(email, name).catch(console.error);

    res.status(201).json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save enquiry' });
  }
});

// GET /api/enquiries — admin only
router.get('/', requireAuth, async (req, res) => {
  const { status, page = '1', limit = '20' } = req.query as any;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let query = 'SELECT * FROM enquiries';
  const params: any[] = [];
  if (status) { query += ' WHERE status = $1'; params.push(status); }
  query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(parseInt(limit), offset);

  const countQuery = status
    ? 'SELECT COUNT(*) FROM enquiries WHERE status = $1'
    : 'SELECT COUNT(*) FROM enquiries';

  const [rows, count] = await Promise.all([
    pool.query(query, params),
    pool.query(countQuery, status ? [status] : []),
  ]);

  res.json({ data: rows.rows, total: parseInt(count.rows[0].count), page: parseInt(page) });
});

// PATCH /api/enquiries/:id/status — admin only
router.patch('/:id/status', requireAuth, async (req, res) => {
  const { status } = req.body;
  if (!['new', 'in-progress', 'resolved'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const result = await pool.query(
    'UPDATE enquiries SET status=$1 WHERE id=$2 RETURNING *',
    [status, req.params.id]
  );
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
});

// DELETE /api/enquiries/:id — admin only
router.delete('/:id', requireAuth, async (req, res) => {
  const result = await pool.query('DELETE FROM enquiries WHERE id=$1', [req.params.id]);
  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ success: true });
});

export default router;
