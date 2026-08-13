## File: apps/meteor/client/lib/e2ee/E2ERoomState.ts

```typescript
export type E2ERoomState =
	| 'NOT_STARTED'
	| 'DISABLED'
	| 'ESTABLISHING'
	| 'CREATING_KEYS'
	| 'WAITING_KEYS'
	| 'KEYS_RECEIVED'
	| 'READY'
	| 'ERROR';

```