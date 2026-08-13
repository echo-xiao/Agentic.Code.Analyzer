## File: packages/gazzodown/src/elements/SpoilerSpan.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';
import type { KeyboardEvent } from 'react';
import { lazy, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BoldSpan from './BoldSpan';
import ImageElement from './ImageElement';
import ItalicSpan from './ItalicSpan';
import LinkSpan from './LinkSpan';
import PlainSpan from './PlainSpan';
import StrikeSpan from './StrikeSpan';
import Timestamp from './Timestamp';
import CodeElement from '../code/CodeElement';
import ColorElement from '../colors/ColorElement';
import EmojiElement from '../emoji/EmojiElement';
import KatexErrorBoundary from '../katex/KatexErrorBoundary';
import ChannelMentionElement from '../mentions/ChannelMentionElement';
import UserMentionElement from '../mentions/UserMentionElement';

const KatexElement = lazy(() => import('../katex/KatexElement'));

export type SpoilerSpanProps = {
	children: MessageParser.Spoiler['value'];
};

const spoilerStyle = {
	cursor: 'pointer',
	userSelect: 'none',
	borderRadius: 2,
	paddingInline: 2,
	filter: 'blur(4px)',
	transition: 'filter 230ms ease',
} as const;

const revealedStyle = {
	filter: 'none',
	transition: 'filter 230ms ease',
} as const;

const srOnlyStyle = {
	border: 0,
	clip: 'rect(0 0 0 0)',
	height: 1,
	margin: -1,
	overflow: 'hidden',
	padding: 0,
	position: 'absolute',
	whiteSpace: 'nowrap',
	width: 1,
} as const;

const SpoilerSpan = ({ children }: SpoilerSpanProps) => {
    /* Implementation Hidden */
};

const renderBlockComponent = (block: MessageParser.Inlines, index: number) => {
    /* Implementation Hidden */
};

export default SpoilerSpan;

```