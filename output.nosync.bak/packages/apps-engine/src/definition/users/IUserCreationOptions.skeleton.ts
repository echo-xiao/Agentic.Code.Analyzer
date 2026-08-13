## File: packages/apps-engine/src/definition/users/IUserCreationOptions.ts

```typescript
export interface IUserCreationOptions {
	avatarUrl?: string;
	joinDefaultChannels?: boolean;
	verified?: boolean;
	requirePasswordChange?: boolean;
	sendWelcomeEmail?: boolean;
}

```