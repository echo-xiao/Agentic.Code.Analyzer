## File: apps/meteor/ee/server/api/v1/omnichannel/lib/inquiries.ts

```typescript
import { LivechatInquiry, Users, OmnichannelServiceLevelAgreements } from '@rocket.chat/models';

import { updateRoomSLA } from './sla';

export async function setSLAToInquiry({ userId, roomId, sla }: { userId: string; roomId: string; sla?: string }): Promise<void> {
    /* Implementation Hidden */
}

```