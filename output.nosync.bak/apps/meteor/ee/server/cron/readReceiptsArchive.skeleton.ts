## File: apps/meteor/ee/server/cron/readReceiptsArchive.ts

```typescript
import { cronJobs } from '@rocket.chat/cron';
import { Logger } from '@rocket.chat/logger';
import { ReadReceipts, ReadReceiptsArchive, Messages } from '@rocket.chat/models';

import { settings } from '../../../app/settings/server';
import { sleep } from '../../../lib/utils/sleep';

const logger = new Logger('ReadReceiptsArchive');

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const BATCH_DELAY_MS = 1000; // 1 second delay between batches

export async function archiveOldReadReceipts(): Promise<void> {
    /* Implementation Hidden */
}

export async function readReceiptsArchiveCron(): Promise<void> {
    /* Implementation Hidden */
}

```