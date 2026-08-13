## File: ee/packages/pdf-worker/src/index.ts

```typescript
import type { i18n } from 'i18next';

import { ChatTranscript } from './strategies/ChatTranscript';
import type { IStrategy } from './types/IStrategy';
import type { WorkerData } from './types/WorkerData';

export type Templates = 'chat-transcript';

export type { Quote, MessageData, WorkerData } from './types/WorkerData';

export class PdfWorker {
	protected validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

	readonly worker: IStrategy;

	constructor(public readonly mode: Templates) {
        /* Implementation Hidden */
    }

	private getWorkerClass(): IStrategy {
        /* Implementation Hidden */
    }

	isMimeTypeValid(mimeType?: string): boolean {
        /* Implementation Hidden */
    }

	async renderToStream({ data, i18n }: { data: WorkerData; i18n: i18n }): Promise<NodeJS.ReadableStream> {
        /* Implementation Hidden */
    }
}

```