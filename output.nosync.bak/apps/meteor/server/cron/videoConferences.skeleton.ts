## File: apps/meteor/server/cron/videoConferences.ts

```typescript
import { VideoConf } from '@rocket.chat/core-services';
import type { VideoConference } from '@rocket.chat/core-typings';
import { VideoConferenceStatus } from '@rocket.chat/core-typings';
import { cronJobs } from '@rocket.chat/cron';
import { VideoConference as VideoConferenceModel } from '@rocket.chat/models';

// 24 hours
const VIDEO_CONFERENCE_TTL = 24 * 60 * 60 * 1000;

async function runVideoConferences(): Promise<void> {
    /* Implementation Hidden */
}

export async function videoConferencesCron(): Promise<void> {
    /* Implementation Hidden */
}

```