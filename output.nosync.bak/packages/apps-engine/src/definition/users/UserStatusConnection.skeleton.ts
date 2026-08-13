## File: packages/apps-engine/src/definition/users/UserStatusConnection.ts

```typescript
export enum UserStatusConnection {
	OFFLINE = 'offline',
	ONLINE = 'online',
	AWAY = 'away',
	BUSY = 'busy',
	INVISIBLE = 'invisible',
	/** This happens for livechat users and rocket.cat. */
	UNDEFINED = 'undefined',
}

```