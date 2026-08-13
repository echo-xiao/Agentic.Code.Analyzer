## File: apps/meteor/server/services/messages/hooks/BeforeSaveMarkdownParser.ts

```typescript
import { isE2EEMessage } from '@rocket.chat/core-typings';
import type { IMessage } from '@rocket.chat/core-typings';
import { parse } from '@rocket.chat/message-parser';

import { getMessageMaxParseLength } from '../../../../lib/getMessageMaxParseLength';

type ParserConfig = {
	colors?: boolean;
	emoticons?: boolean;
	customDomains?: string[];
	katex?: {
		dollarSyntax: boolean;
		parenthesisSyntax: boolean;
	};
};

export class BeforeSaveMarkdownParser {
	constructor(private enabled: boolean = true) {
        /* Implementation Hidden */
    }

	async parseMarkdown({ message, config }: { message: IMessage; config: ParserConfig }): Promise<IMessage> {
        /* Implementation Hidden */
    }
}

```