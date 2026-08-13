## File: apps/meteor/app/apps/server/converters/convertMessageFiles.ts

```typescript
import type { IMessage as AppsEngineMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IMessage } from '@rocket.chat/core-typings';

export async function convertMessageFiles(
	files: IMessage['files'],
	attachments: IMessage['attachments'],
): Promise<AppsEngineMessage['files']> {
    /* Implementation Hidden */
}

```