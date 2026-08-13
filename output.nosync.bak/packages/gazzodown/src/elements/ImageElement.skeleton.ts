## File: packages/gazzodown/src/elements/ImageElement.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';
import { useMemo } from 'react';

import { sanitizeUrl } from './sanitizeUrl';

const flattenMarkup = (
	markup:
		| MessageParser.Timestamp
		| MessageParser.Markup
		| MessageParser.InlineCode
		| MessageParser.Link
		| MessageParser.Emoji
		| MessageParser.ChannelMention
		| MessageParser.UserMention,
): string => {
    /* Implementation Hidden */
};

const style = {
	maxWidth: '100%',
};

export type ImageElementProps = {
	src: string;
	alt: MessageParser.Markup;
};

const ImageElement = ({ src, alt }: ImageElementProps) => {
    /* Implementation Hidden */
};

export default ImageElement;

```