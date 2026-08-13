## File: apps/meteor/client/views/marketplace/helpers/sortAppsByAlphabeticalOrInverseOrder.ts

```typescript
export const sortAppsByAlphabeticalOrInverseOrder = (firstWord: string, secondWord: string): number =>
	firstWord.toLowerCase().localeCompare(secondWord.toLowerCase());

```