## File: apps/meteor/server/services/messages/hooks/BeforeSaveBadWords.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import type BadWordsFilter from 'bad-words';

export class BeforeSaveBadWords {
	badWords: BadWordsFilter | null = null;

	badWordsRegex: RegExp | null = null;

	protected logger: Logger;

	constructor() {
        /* Implementation Hidden */
    }

	async configure(badWordsList?: string, goodWordsList?: string) {
        /* Implementation Hidden */
    }

	disable() {
        /* Implementation Hidden */
    }

	async filterBadWords({ message }: { message: IMessage }): Promise<IMessage> {
        /* Implementation Hidden */
    }
}

```