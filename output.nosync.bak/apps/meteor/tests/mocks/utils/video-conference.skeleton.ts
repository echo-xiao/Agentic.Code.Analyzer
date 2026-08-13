## File: apps/meteor/tests/mocks/utils/video-conference.ts

```typescript
import { faker } from '@faker-js/faker';
import type { IRoom, VideoConferenceType } from '@rocket.chat/core-typings';

const callId = faker.database.mongodbObjectId();
const uid = faker.database.mongodbObjectId();

export function createFakeVideoConfCall({ type, rid }: { type: VideoConferenceType; rid: IRoom['_id'] }) {
    /* Implementation Hidden */
}

export function createFakeIncomingCall({ rid }: { rid: IRoom['_id'] }) {
    /* Implementation Hidden */
}

```