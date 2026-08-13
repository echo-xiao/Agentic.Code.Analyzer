## File: packages/rest-typings/src/v1/instances.ts

```typescript
import type { IInstanceStatus } from '@rocket.chat/core-typings';

export interface IInstance {
	address?: string;
	currentStatus: {
		connected: boolean;
		local?: boolean;
		lastHeartbeatTime?: number;
	};
	instanceRecord?: IInstanceStatus;
	broadcastAuth: boolean;
}

export type InstancesEndpoints = {
	'/v1/instances.get': {
		GET: () => {
			instances: IInstance[];
		};
	};
};

```