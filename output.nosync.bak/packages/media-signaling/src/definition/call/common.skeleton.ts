## File: packages/media-signaling/src/definition/call/common.ts

```typescript
export type CallActorType = 'user' | 'sip';

export type CallContact = {
	type?: CallActorType;
	id?: string;
	contractId?: string;

	displayName?: string;
	username?: string;
	sipExtension?: string;
};

export type CallRole = 'caller' | 'callee';

```