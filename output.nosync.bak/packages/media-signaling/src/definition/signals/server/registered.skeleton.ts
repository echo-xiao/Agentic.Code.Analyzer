## File: packages/media-signaling/src/definition/signals/server/registered.ts

```typescript
/** Server is notifying the client that its registration was processed */
export type ServerMediaSignalRegistered = {
	type: 'registered';

	toContractId: string;

	calls: string[];

	activeCalls: string[];
};

```