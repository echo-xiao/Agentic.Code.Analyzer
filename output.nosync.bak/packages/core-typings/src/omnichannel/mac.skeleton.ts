## File: packages/core-typings/src/omnichannel/mac.ts

```typescript
export type MACStats = {
	contactsCount: number;
	conversationsCount: number;
	sources: { source: string; contactsCount: number; conversationsCount: number }[];
};

```