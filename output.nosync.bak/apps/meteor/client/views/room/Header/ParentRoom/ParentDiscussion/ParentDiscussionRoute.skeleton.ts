## File: apps/meteor/client/views/room/Header/ParentRoom/ParentDiscussion/ParentDiscussionRoute.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useUserSubscription } from '@rocket.chat/ui-contexts';

import ParentDiscussion from './ParentDiscussion';
import ParentDiscussionWithData from './ParentDiscussionWithData';

export type ParentDiscussionRouteProps = {
	room: Pick<IRoom, '_id' | 't' | 'name' | 'fname' | 'prid' | 'u'>;
};

const ParentDiscussionRoute = ({ room }: ParentDiscussionRouteProps) => {
    /* Implementation Hidden */
};

export default ParentDiscussionRoute;

```