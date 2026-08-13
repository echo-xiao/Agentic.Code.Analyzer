## File: packages/apps-engine/src/definition/roles/IRole.ts

```typescript
export interface IRole {
	description: string;
	mandatory2fa?: boolean;
	name: string;
	protected: boolean;
	scope: 'Users' | 'Subscriptions';
	id: string;
}

```