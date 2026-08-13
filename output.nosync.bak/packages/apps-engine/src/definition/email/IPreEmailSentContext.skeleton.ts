## File: packages/apps-engine/src/definition/email/IPreEmailSentContext.ts

```typescript
import type { IEmailDescriptor } from './IEmailDescriptor';

export interface IPreEmailSentContext {
	context: unknown;
	email: IEmailDescriptor;
}

```