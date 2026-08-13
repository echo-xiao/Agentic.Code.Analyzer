## File: packages/apps-engine/src/definition/email/IEmail.ts

```typescript
export interface IEmail {
	to: string | string[];
	/**
	 * @deprecated this will be inferred from the settings
	 */
	from?: string;
	replyTo?: string;
	subject: string;
	html?: string;
	text?: string;
	headers?: string;
}

```