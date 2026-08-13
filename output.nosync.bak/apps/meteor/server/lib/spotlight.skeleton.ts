## File: apps/meteor/server/lib/spotlight.js

```typescript
import { Team } from '@rocket.chat/core-services';
import { Users, Subscriptions as SubscriptionsRaw, Rooms } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';

import { hasPermissionAsync, hasAllPermissionAsync } from './authorization/hasPermission';
import { canAccessRoomAsync, roomAccessAttributes } from '../../app/authorization/server';
import { settings } from '../../app/settings/server';
import { trim } from '../../lib/utils/stringUtils';
import { readSecondaryPreferred } from '../database/readSecondaryPreferred';
import { roomCoordinator } from './rooms/roomCoordinator';

export class Spotlight {
	async fetchRooms(userId, rooms) {
        /* Implementation Hidden */
    }

	async searchRooms({ userId, text, includeFederatedRooms = false }) {
        /* Implementation Hidden */
    }

	mapOutsiders(u) {
        /* Implementation Hidden */
    }

	processLimitAndUsernames(options, usernames, users) {
        /* Implementation Hidden */
    }

	async _searchInsiderUsers({ rid, text, usernames, options, users, insiderExtraQuery, match = { startsWith: false, endsWith: false } }) {
        /* Implementation Hidden */
    }

	async _searchConnectedUsers(userId, { text, usernames, options, users, match = { startsWith: false, endsWith: false } }, roomType) {
        /* Implementation Hidden */
    }

	async _searchOutsiderUsers({ text, usernames, options, users, canListOutsiders, match = { startsWith: false, endsWith: false } }) {
        /* Implementation Hidden */
    }

	mapTeams(teams) {
        /* Implementation Hidden */
    }

	async _searchTeams(userId, { text, options, users, mentions }) {
        /* Implementation Hidden */
    }

	async searchUsers({ userId, rid, text, usernames, mentions }) {
        /* Implementation Hidden */
    }
}

```