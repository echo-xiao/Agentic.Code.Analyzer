## File: packages/core-typings/src/cloud/NpsSurveyAnnouncement.ts

```typescript
import * as z from 'zod';

import { TimestampSchema } from '../utils';

export const NpsSurveyAnnouncementSchema = z.object({
	id: z.string(),
	startAt: TimestampSchema,
	expireAt: TimestampSchema,
});

export type NpsSurveyAnnouncement = z.infer<typeof NpsSurveyAnnouncementSchema>;

```