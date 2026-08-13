## File: ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/StrikeSpan.tsx

```typescript
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import type * as MessageParser from '@rocket.chat/message-parser';

import BoldSpan from './BoldSpan';
import EmojiSpan from './EmojiSpan';
import ItalicSpan from './ItalicSpan';
import LinkSpan from './LinkSpan';

const styles = StyleSheet.create({
	strike: {
		textDecoration: 'line-through',
	},
});

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
		{children.map((child, index) => {
			if (child.type === 'LINK' || child.type === 'PLAIN_TEXT' || child.type === 'ITALIC' || child.type === 'BOLD') {
				return (
					<View style={styles.strike} key={index}>
						{renderBlockComponent(child, index)}
					</View>
				);
			}
			return renderBlockComponent(child, index);
		})}
	</>
);

const renderBlockComponent = (child: MessageBlock, index: number) => {
    /* Implementation Hidden */
};

export default StrikeSpan;

```