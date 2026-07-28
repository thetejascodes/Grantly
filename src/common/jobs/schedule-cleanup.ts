import cron from 'node-cron';
import { cleanupExpiredRows } from './cleanup-expired.job.js';

/**
 * Runs the expired-row cleanup every 15 minutes.
 */
export function scheduleCleanupJob(): void {
  cron.schedule('*/15 * * * *', () => {
    cleanupExpiredRows().catch((err) => {
      console.error('[cleanup] failed:', err);
    });
  });

  console.log('[cleanup] scheduled to run every 15 minutes');
}