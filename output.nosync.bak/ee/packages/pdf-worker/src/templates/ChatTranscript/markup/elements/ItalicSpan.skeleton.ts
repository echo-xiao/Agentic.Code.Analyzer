## File: ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/ItalicSpan.tsx

```typescript
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import type * as MessageParser from '@rocket.chat/message-parser';

import BoldSpan from './BoldSpan';
import EmojiSpan from './EmojiSpan';
import LinkSpan from './LinkSpan';
import StrikeSpan from './StrikeSpan';

const styles = StyleSheet.create({
	italic: {
		fontStyle: 'italic',
	},
});

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
		{children.map((child, index) => {
			if (child.type === 'LINK' || child.type === 'PLAIN_TEXT' || child.type === 'STRIKE' || child.type === 'BOLD') {
				return (
					<View style={styles.italic} key={index}>
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

export default ItalicSpan;

```