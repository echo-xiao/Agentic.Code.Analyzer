## File: packages/gazzodown/src/elements/ItalicSpan.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';

import BoldSpan from './BoldSpan';
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
	| MessageParser.MarkupExcluding<MessageParser.Italic>
	| MessageParser.InlineCode;

export type ItalicSpanProps = {
	children: MessageBlock[];
};

const ItalicSpan = ({ children }: ItalicSpanProps) => (
	<>
		{children.map((block, index) => {
			if (
				block.type === 'LINK' ||
				block.type === 'PLAIN_TEXT' ||
				block.type === 'STRIKE' ||
				block.type === 'BOLD' ||
				block.type === 'INLINE_CODE'
			) {
				return <em key={index}>{renderBlockComponent(block, index)}</em>;
			}
			return renderBlockComponent(block, index);
		})}
	</>
);

const renderBlockComponent = (block: MessageBlock, index: number) => {
    /* Implementation Hidden */
};

export default ItalicSpan;

```