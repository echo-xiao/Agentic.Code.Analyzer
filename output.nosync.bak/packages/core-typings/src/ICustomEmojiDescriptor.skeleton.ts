## File: packages/core-typings/src/ICustomEmojiDescriptor.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export interface ICustomEmojiDescriptor extends IRocketChatRecord {
	name: string;
	aliases: string;
	extension: string;
}

```