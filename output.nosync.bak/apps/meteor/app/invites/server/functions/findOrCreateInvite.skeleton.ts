## File: apps/meteor/app/invites/server/functions/findOrCreateInvite.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IInvite } from '@rocket.chat/core-typings';
import { Invites, Subscriptions, Rooms } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { Meteor } from 'meteor/meteor';

import { RoomMemberActions } from '../../../../definition/IRoomTypeConfig';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { roomCoordinator } from '../../../../server/lib/rooms/roomCoordinator';
import { settings } from '../../../settings/server';
import { getURL } from '../../../utils/server/getURL';

function getInviteUrl(invite: Omit<IInvite, '_updatedAt'>) {
    /* Implementation Hidden */
}

const possibleDays = [0, 1, 7, 15, 30];
const possibleUses = [0, 1, 5, 10, 25, 50, 100];

export const findOrCreateInvite = async (userId: string, invite: Pick<IInvite, 'rid' | 'days' | 'maxUses'>) => {
    /* Implementation Hidden */
};

```