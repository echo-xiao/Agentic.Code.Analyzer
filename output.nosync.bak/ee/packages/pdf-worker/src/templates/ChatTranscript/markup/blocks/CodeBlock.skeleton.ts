## File: ee/packages/pdf-worker/src/templates/ChatTranscript/markup/blocks/CodeBlock.tsx

```typescript
import { Text, View } from '@react-pdf/renderer';
import type * as MessageParser from '@rocket.chat/message-parser';

import { codeStyles } from '../elements/CodeSpan';

type CodeBlockProps = {
	lines: MessageParser.CodeLine[];
};

const CodeBlock = ({ lines }: CodeBlockProps) => (
	<View style={{ ...codeStyles.wrapper, padding: 8 }} wrap>
		{lines.map((line, index) => (
			<Text key={index} style={codeStyles.code}>
				{line.value?.value || ' '}
			</Text>
		))}
	</View>
);

export default CodeBlock;

```