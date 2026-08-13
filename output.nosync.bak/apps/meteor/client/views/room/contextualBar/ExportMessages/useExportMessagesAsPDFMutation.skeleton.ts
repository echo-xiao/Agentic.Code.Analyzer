## File: apps/meteor/client/views/room/contextualBar/ExportMessages/useExportMessagesAsPDFMutation.tsx

```typescript
import { Document, Font, Image, Page, pdf, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { IMessage, MessageAttachmentDefault } from '@rocket.chat/core-typings';
import { MessageTypes } from '@rocket.chat/message-types';
import { escapeHTML } from '@rocket.chat/string-helpers';
import { useSetting, useToastMessageDispatch, useAbsoluteUrl } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';
import { Messages } from '../../../../stores';

const leftTab = {
	marginLeft: 20,
};
const NOTO_SANS_FONTS: { name: string; fontSrc: string }[] = [
	{ name: 'Noto Sans Hebrew', fontSrc: '/fonts/NotoSansHebrew-Regular.ttf' },
	{ name: 'Noto Sans', fontSrc: '/fonts/NotoSans-Regular.ttf' },
	{ name: 'Noto Sans Arabic', fontSrc: '/fonts/NotoSansArabic-Regular.ttf' },
	{ name: 'Noto Sans Devanagari', fontSrc: '/fonts/NotoSansDevanagari-Regular.ttf' },
	{ name: 'Noto Sans Bengali', fontSrc: '/fonts/NotoSansBengali-Regular.ttf' },
	{ name: 'Noto Sans Tamil', fontSrc: '/fonts/NotoSansTamil-Regular.ttf' },
	{ name: 'Noto Sans Sinhala', fontSrc: '/fonts/NotoSansSinhala-Regular.ttf' },
	{ name: 'Noto Sans Thai', fontSrc: '/fonts/NotoSansThai-Regular.ttf' },
	{ name: 'Noto Sans Lao', fontSrc: '/fonts/NotoSansLao-Regular.ttf' },
	{ name: 'Noto Sans Georgian', fontSrc: '/fonts/NotoSansGeorgian-Regular.ttf' },
	{ name: 'Noto Sans JP', fontSrc: '/fonts/NotoSansJP-Regular.ttf' },
	{ name: 'Noto Sans KR', fontSrc: '/fonts/NotoSansKR-Regular.ttf' },
	{ name: 'Noto Sans SC', fontSrc: '/fonts/NotoSansSC-Regular.ttf' },
	{ name: 'Noto Sans TC', fontSrc: '/fonts/NotoSansTC-Regular.ttf' },
	{ name: 'Noto Sans HK', fontSrc: '/fonts/NotoSansHK-Regular.ttf' },
];

const pdfStyles = StyleSheet.create({
	page: {
		fontFamily: NOTO_SANS_FONTS.map((font) => font.name),
	},
	messageHeader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		gap: 10,
	},
	username: {
		color: '#000',
		fontSize: 14,
	},
	dateTime: {
		color: '#aaa',
		fontSize: 12,
	},
	threadMessagesCount: {
		color: '#000',
		fontSize: 14,
	},
	threadMessage: {
		color: '#555',
		fontSize: 12,
		...leftTab,
	},
	message: {
		color: '#555',
		fontSize: 14,
	},
});

export const useExportMessagesAsPDFMutation = () => {
    /* Implementation Hidden */
};

```