## File: packages/ui-kit/src/blocks/text/Markdown.ts

```typescript
import type { WithTranslations } from '../WithTranslations';

export type Markdown = WithTranslations<{
	type: 'mrkdwn';
	text: string;
	verbatim?: boolean;
}>;

```