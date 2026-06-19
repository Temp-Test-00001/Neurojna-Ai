import { Router } from 'express';
import { pool } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/stats — admin only, real-time dashboard stats
router.get('/', requireAuth, async (_req, res) => {
  const [
    totalEnquiries,
    newEnquiries,
    inProgress,
    resolved,
    totalSubscribers,
    recentEnquiries,
    enquiriesByService,
    enquiriesOverTime,
    subscribersOverTime,
  ] = await Promise.all([
    pool.query('SELECT COUNT(*) FROM enquiries'),
    pool.query("SELECT COUNT(*) FROM enquiries WHERE status='new'"),
    pool.query("SELECT COUNT(*) FROM enquiries WHERE status='in-progress'"),
    pool.query("SELECT COUNT(*) FROM enquiries WHERE status='resolved'"),
    pool.query('SELECT COUNT(*) FROM subscribers'),
    pool.query('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5'),
    pool.query(`
      SELECT service, COUNT(*) as count
      FROM enquiries
      WHERE service IS NOT NULL
      GROUP BY service
      ORDER BY count DESC
    `),
    pool.query(`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM enquiries
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `),
    pool.query(`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM subscribers
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `),
  ]);

  res.json({
    counts: {
      total:       parseInt(totalEnquiries.rows[0].count),
      new:         parseInt(newEnquiries.rows[0].count),
      inProgress:  parseInt(inProgress.rows[0].count),
      resolved:    parseInt(resolved.rows[0].count),
      subscribers: parseInt(totalSubscribers.rows[0].count),
    },
    recentEnquiries: recentEnquiries.rows,
    enquiriesByService: enquiriesByService.rows,
    enquiriesOverTime: enquiriesOverTime.rows,
    subscribersOverTime: subscribersOverTime.rows,
  });
});

export default router;
