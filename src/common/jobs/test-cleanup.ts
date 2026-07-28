import { cleanupExpiredRows } from './cleanup-expired.job.js';

cleanupExpiredRows()
  .then((result) => {
    console.log('Cleanup result:', result);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Cleanup failed:', err);
    process.exit(1);
  });