## File: packages/gazzodown/src/elements/StrikeSpan.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';

import BoldSpan from './BoldSpan';
import ItalicSpan from './ItalicSpan';
import LinkSpan from './LinkSpan';
import PlainSpan from './PlainSpan';
import CodeElement from '../code/CodeElement';
import EmojiElement from '../emoji/EmojiElement';
import ChannelMentionElement from '../mentions/ChannelMentionElement';
import UserMentionElement from '../mentions/UserMentionElement';

type MessageBlock =
	| MessageParser.Timestamp
	| MessageParser.Emoji
	| MessageParser.ChannelMention
	| MessageParser.UserMention
	| MessageParser.Link
	| MessageParser.MarkupExcluding<MessageParser.Strike>
	| MessageParser.InlineCode;

export type StrikeSpanProps = {
	children: MessageBlock[];
};

const StrikeSpan = ({ children }: StrikeSpanProps) => (
	<>
		{children.map((block, index) => {
			if (
				block.type === 'LINK' ||
				block.type === 'PLAIN_TEXT' ||
				block.type === 'ITALIC' ||
				block.type === 'BOLD' ||
				block.type === 'INLINE_CODE'
			) {
				return <del key={index}>{renderBlockComponent(block, index)}</del>;
			}
			return renderBlockComponent(block, index);
		})}
	</>
);

const renderBlockComponent = (block: MessageBlock, index: number) => {
    /* Implementation Hidden */
};

export default StrikeSpan;

```