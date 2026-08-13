## File: ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/BoldSpan.tsx

```typescript
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import type * as MessageParser from '@rocket.chat/message-parser';

import EmojiSpan from './EmojiSpan';
import ItalicSpan from './ItalicSpan';
import LinkSpan from './LinkSpan';
import StrikeSpan from './StrikeSpan';

const styles = StyleSheet.create({
	bold: {
		fontWeight: 700,
	},
});

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
		{children.map((child, index) => {
			if (child.type === 'LINK' || child.type === 'PLAIN_TEXT' || child.type === 'ITALIC' || child.type === 'STRIKE') {
				return (
					<View style={styles.bold} key={index}>
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

export default BoldSpan;

```