## File: apps/meteor/client/views/room/Header/ParentRoom/ParentDiscussion/ParentDiscussionWithData.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';

import ParentDiscussion from './ParentDiscussion';
import { useRoomInfoEndpoint } from '../../../../../hooks/useRoomInfoEndpoint';

export type ParentDiscussionWithDataProps = { rid: IRoom['_id'] };

const ParentDiscussionWithData = ({ rid }: ParentDiscussionWithDataProps) => {
    /* Implementation Hidden */
};

export default ParentDiscussionWithData;

```