## File: packages/core-services/src/types/IUserService.ts

```typescript
export interface IUserService {
	ensureLoginTokensLimit(uid: string): Promise<void>;
}

```