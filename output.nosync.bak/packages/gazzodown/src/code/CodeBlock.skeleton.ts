## File: packages/gazzodown/src/code/CodeBlock.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { IconButton, Box } from '@rocket.chat/fuselage';
import type * as MessageParser from '@rocket.chat/message-parser';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import hljs from 'highlight.js';
import { Fragment, useContext, useLayoutEffect, useMemo, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { MarkupInteractionContext } from '../MarkupInteractionContext';

export type CodeBlockProps = {
	language?: string;
	lines: MessageParser.CodeLine[];
};

const onHoverStyle = css`
	opacity: 0;
	user-select: none;

	[data-code-block-wrapper]:hover &,
	[data-code-block-wrapper]:focus-within & {
		opacity: 1;
	}
`;

const CodeBlock = ({ lines = [], language }: CodeBlockProps) => {
    /* Implementation Hidden */
};

export default CodeBlock;

```