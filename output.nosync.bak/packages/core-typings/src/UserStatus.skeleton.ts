## File: packages/core-typings/src/UserStatus.ts

```typescript
export enum UserStatus {
	ONLINE = 'online',
	AWAY = 'away',
	OFFLINE = 'offline',
	BUSY = 'busy',
	DISABLED = 'disabled',
}

export type PresenceSource = 'internal' | 'external' | 'manual';

```