## File: apps/meteor/server/lib/messages/parseUrlsInMessage.ts

```typescript
import type { IMessage, AtLeast } from '@rocket.chat/core-typings';

import { extractUrlsFromMessageAST } from './extractUrlsFromMessageAST';
import { Markdown } from '../../../app/markdown/server';
import { settings } from '../../../app/settings/server';
import { getMessageUrlRegex } from '../../../lib/getMessageUrlRegex';

const prepareUrl = (url: string, previewUrls: string[] | undefined) => ({
	url,
	meta: {},
	...(previewUrls && !previewUrls.includes(url) && !url.includes(settings.get('Site_Url')) && { ignoreParse: true }),
});

const prepareUrls = (urls: string[], previewUrls?: string[]) => [...new Set(urls)].map((url) => prepareUrl(url, previewUrls));

export const parseUrlsInMessage = (
	message: AtLeast<IMessage, 'msg' | 'md'> & {
		parseUrls?: boolean;
	},
	previewUrls?: string[],
) => {
    /* Implementation Hidden */
};

```