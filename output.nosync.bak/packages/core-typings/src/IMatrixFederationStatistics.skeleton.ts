## File: packages/core-typings/src/IMatrixFederationStatistics.ts

```typescript
export interface IMatrixFederationStatistics {
	enabled: boolean;
	maximumSizeOfPublicRoomsUsers: number;
	biggestRoom: {
		_id: string;
		name: string;
		usersCount: number;
	} | null;
	smallestRoom: {
		_id: string;
		name: string;
		usersCount: number;
	} | null;
	amountOfExternalUsers: number;
	amountOfFederatedRooms: number;
	externalConnectedServers: { quantity: number; servers: string[] };
}

```