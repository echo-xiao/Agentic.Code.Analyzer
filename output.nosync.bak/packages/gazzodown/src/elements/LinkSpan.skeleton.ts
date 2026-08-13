## File: packages/gazzodown/src/elements/LinkSpan.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';
import { getBaseURI, isExternal } from '@rocket.chat/ui-client/dist/helpers/getBaseURI';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import BoldSpan from './BoldSpan';
import ItalicSpan from './ItalicSpan';
import PlainSpan from './PlainSpan';
import StrikeSpan from './StrikeSpan';
import { sanitizeUrl } from './sanitizeUrl';

export type LinkSpanProps = {
	href: string;
	label: MessageParser.Markup | MessageParser.Markup[];
};

const LinkSpan = ({ href, label }: LinkSpanProps) => {
    /* Implementation Hidden */
};

export default LinkSpan;

```