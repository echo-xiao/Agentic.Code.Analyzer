## File: apps/meteor/server/services/federation/infrastructure/rocket-chat/adapters/Statistics.ts

```typescript
import type { IMatrixFederationStatistics } from '@rocket.chat/core-typings';
import { Rooms, Users } from '@rocket.chat/models';

import { settings } from '../../../../../../app/settings/server';

class RocketChatStatisticsAdapter {
	async getBiggestRoomAvailable(): Promise<{
		_id: string;
		name: string;
		usersCount: number;
	} | null> {
        /* Implementation Hidden */
    }

	async getSmallestRoomAvailable(): Promise<{
		_id: string;
		name: string;
		usersCount: number;
	} | null> {
        /* Implementation Hidden */
    }

	async getAmountOfExternalUsers(): Promise<number> {
        /* Implementation Hidden */
    }

	async getAmountOfExternalRooms(): Promise<number> {
        /* Implementation Hidden */
    }

	async getAmountOfConnectedExternalServers(): Promise<{ quantity: number; servers: string[] }> {
        /* Implementation Hidden */
    }
}

export const getMatrixFederationStatistics = async (): Promise<IMatrixFederationStatistics> => {
    /* Implementation Hidden */
};

```