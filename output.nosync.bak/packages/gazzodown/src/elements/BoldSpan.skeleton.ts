## File: packages/gazzodown/src/elements/BoldSpan.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';

import ItalicSpan from './ItalicSpan';
import LinkSpan from './LinkSpan';
import PlainSpan from './PlainSpan';
import StrikeSpan from './StrikeSpan';
import CodeElement from '../code/CodeElement';
import EmojiElement from '../emoji/EmojiElement';
import ChannelMentionElement from '../mentions/ChannelMentionElement';
import UserMentionElement from '../mentions/UserMentionElement';

type MessageBlock =
	| MessageParser.Emoji
	| MessageParser.ChannelMention
	| MessageParser.UserMention
	| MessageParser.Link
	| MessageParser.MarkupExcluding<MessageParser.Bold>
	| MessageParser.InlineCode;

export type BoldSpanProps = {
	children: MessageBlock[];
};

const BoldSpan = ({ children }: BoldSpanProps) => (
	<>
		{children.map((block, index) => {
			if (
				block.type === 'LINK' ||
				block.type === 'PLAIN_TEXT' ||
				block.type === 'STRIKE' ||
				block.type === 'ITALIC' ||
				block.type === 'INLINE_CODE'
			) {
				return <strong key={index}>{renderBlockComponent(block, index)}</strong>;
			}
			return renderBlockComponent(block, index);
		})}
	</>
);

const renderBlockComponent = (block: MessageBlock, index: number) => {
    /* Implementation Hidden */
};

export default BoldSpan;

```