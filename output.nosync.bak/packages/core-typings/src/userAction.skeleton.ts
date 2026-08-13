## File: packages/core-typings/src/userAction.ts

```typescript
import type { IMessage } from './IMessage';

export type IExtras = {
	tmid?: IMessage['_id'];
};

export type IRoomActivity = Record<string, Record<string, ReturnType<typeof setTimeout>>>;

```