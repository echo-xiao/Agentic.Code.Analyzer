## File: packages/core-typings/src/federation/v1/IFederationServer.ts

```typescript
import type { IRocketChatRecord } from '../../IRocketChatRecord';

export interface IFederationServer extends IRocketChatRecord {
	domain: string;
}

```