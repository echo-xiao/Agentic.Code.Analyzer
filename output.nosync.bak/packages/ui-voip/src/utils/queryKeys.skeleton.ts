## File: packages/ui-voip/src/utils/queryKeys.ts

```typescript
export const mediaCallQueryKeys = {
	all: ['mediaCall'] as const,
	peerAutocomplete: (filter: string) => [...mediaCallQueryKeys.all, 'peerAutocomplete', filter] as const,
};

```