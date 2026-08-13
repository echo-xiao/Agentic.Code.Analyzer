## File: apps/meteor/ee/server/lib/oauth/Manager.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { Roles, Rooms, Users } from '@rocket.chat/models';

import { getValidRoomName } from '../../../../app/utils/server/lib/getValidRoomName';
import { addUserToRoom } from '../../../../server/lib/rooms/addUserToRoom';
import { createRoom } from '../../../../server/lib/rooms/createRoom';
import { syncUserRoles } from '../syncUserRoles';

const logger = new Logger('OAuth');

export class OAuthEEManager {
	static async mapSSOGroupsToChannels(
		user: IUser,
		identity: Record<string, any>,
		groupClaimName: string,
		channelsMap: Record<string, any> | undefined,
		channelsAdmin: string,
	): Promise<void> {
        /* Implementation Hidden */
    }

	static async updateRolesFromSSO(
		user: Record<string, any>,
		identity: Record<string, any>,
		roleClaimName: string,
		rolesToSync: string[],
	): Promise<void> {
        /* Implementation Hidden */
    }

	// Returns list of roles from SSO identity
	static async mapRolesFromSSO(identity: Record<string, any>, roleClaimName: string): Promise<string[]> {
        /* Implementation Hidden */
    }
}

```