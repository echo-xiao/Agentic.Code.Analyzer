## File: apps/meteor/app/invites/server/functions/useInviteToken.ts

```typescript
import { isBannedSubscription } from '@rocket.chat/core-typings';
import { Invites, Subscriptions, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { validateInviteToken } from './validateInviteToken';
import { RoomMemberActions } from '../../../../definition/IRoomTypeConfig';
import { addUserToRoom } from '../../../../server/lib/rooms/addUserToRoom';
import { roomCoordinator } from '../../../../server/lib/rooms/roomCoordinator';

export const useInviteToken = async (userId: string, token: string) => {
    /* Implementation Hidden */
};

```