## File: ee/packages/pdf-worker/src/templates/ChatTranscript/index.tsx

```typescript
import * as path from 'node:path';

import ReactPDF, { Font, Document, Page, StyleSheet } from '@react-pdf/renderer';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import type { ChatTranscriptData } from '../../types/ChatTranscriptData';

const FONT_PATH = path.resolve(__dirname, '../../public');

const styles = StyleSheet.create({
	page: {
		fontFamily: 'Inter',
		lineHeight: 1.25,
		color: colors.n800,
		// ugh https://github.com/diegomura/react-pdf/issues/684
		paddingBottom: 32,
	},
	wrapper: {
		paddingHorizontal: 32,
	},
	message: {
		wordWrap: 'break-word',
		fontSize: 12,
		marginBottom: 20,
		textAlign: 'justify',
	},
});

type ChatTranscriptPDFProps = Omit<ChatTranscriptData, 'i18n'>;

export const ChatTranscriptPDF = ({ header, messages }: ChatTranscriptPDFProps) => {
    /* Implementation Hidden */
};

export default async ({ i18n, ...data }: ChatTranscriptData): Promise<NodeJS.ReadableStream> => {
	Font.register({
		family: 'Inter',
		fonts: [
			{ src: `${FONT_PATH}/inter400.ttf` },
			{ src: `${FONT_PATH}/inter400-italic.ttf`, fontStyle: 'italic' },
			{ src: `${FONT_PATH}/inter500.ttf`, fontWeight: 500 },
			{ src: `${FONT_PATH}/inter500-italic.ttf`, fontWeight: 500, fontStyle: 'italic' },
			{ src: `${FONT_PATH}/inter700.ttf`, fontWeight: 700 },
			{ src: `${FONT_PATH}/inter700-italic.ttf`, fontWeight: 700, fontStyle: 'italic' },
		],
	});
	Font.register({
		family: 'FiraCode',
		fonts: [{ src: `${FONT_PATH}/fira-code700.ttf`, fontWeight: 700 }],
	});
	Font.registerHyphenationCallback((word) => [word]);

	return ReactPDF.renderToStream(
		<I18nextProvider i18n={i18n}>
			<ChatTranscriptPDF {...data} />
		</I18nextProvider>,
	);
};

```