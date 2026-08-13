## File: ee/packages/pdf-worker/src/strategies/ChatTranscript.ts

```typescript
import type { i18n } from 'i18next';
import moment from 'moment-timezone';

import exportChatTranscript from '../templates/ChatTranscript';
import type { ChatTranscriptData, PDFMessage } from '../types/ChatTranscriptData';
import type { IStrategy } from '../types/IStrategy';
import type { MessageData, WorkerData } from '../types/WorkerData';

export class ChatTranscript implements IStrategy {
	private isNewDay(current: MessageData, previous: MessageData | undefined, timezone: string): boolean {
        /* Implementation Hidden */
    }

	private parserMessages(messages: MessageData[], dateFormat: string, timeAndDateFormat: string, timezone: string): PDFMessage[] {
        /* Implementation Hidden */
    }

	private isChatTranscriptData = (data: unknown): data is ChatTranscriptData => {
		return (
			typeof data === 'object' &&
			data !== null &&
			'header' in data &&
			'messages' in data &&
			'i18n' in data &&
			typeof data.header === 'object' &&
			data.header !== null &&
			'agent' in data.header &&
			'visitor' in data.header &&
			'siteName' in data.header &&
			'date' in data.header &&
			'time' in data.header
		);
	};

	renderTemplate(data: ChatTranscriptData): Promise<NodeJS.ReadableStream> {
        /* Implementation Hidden */
    }

	parseTemplateData(data: WorkerData, i18n: i18n): ChatTranscriptData {
        /* Implementation Hidden */
    }
}

```