## File: packages/message-parser/src/utils.ts

```typescript
import { parse as tldParse } from 'tldts';

import type {
	BigEmoji,
	Code,
	Color,
	Heading,
	Markup,
	Paragraph,
	Types,
	Task,
	ListItem,
	Inlines,
	LineBreak,
	Emoji,
	KaTeX,
	InlineKaTeX,
	Link,
	Timestamp,
	SourceRange,
	HorizontalRule,
	Table,
	TableRow,
	TableCell,
} from './definitions';

const generate =
	<Type extends keyof Types>(type: Type) =>
	(value: Types[Type]['value']): Types[Type] =>
		({ type, value }) as any;

export const paragraph = generate('PARAGRAPH');

export const bold = generate('BOLD');

export const color = (r: number, g: number, b: number, a = 255): Color => ({
	type: 'COLOR',
	value: { r, g, b, a },
});

export const heading = (value: Heading['value'], level: Heading['level'] = 1): Heading => ({
	type: 'HEADING',
	level,
	value,
});

export const code = (value: Code['value'], language?: Code['language']): Code => ({
	type: 'CODE',
	language: language || 'none',
	value,
});

export const bigEmoji = (value: BigEmoji['value']): BigEmoji => ({
	type: 'BIG_EMOJI',
	value,
});

export const task = (value: Task['value'], status: boolean): Task => ({
	type: 'TASK',
	status,
	value,
});

export const inlineCode = generate('INLINE_CODE');
export const tasks = generate('TASKS');

export const italic = generate('ITALIC');
export const spoiler = generate('SPOILER');

export const plain = generate('PLAIN_TEXT');
export const strike = generate('STRIKE');

export const codeLine = generate('CODE_LINE');

const isValidLink = (link: string) => URL.canParse(link);

const hasAbsoluteSchemePrefix = (src: string) => /^[A-Za-z][A-Za-z0-9+.-]{0,31}:\/\//.test(src);

export const link = (src: string, label?: Markup[]): Link => ({
	type: 'LINK',
	value: { src: plain(src), label: label ?? [plain(src)] },
});

let cachedAutoLinkDomains: string[] | undefined | null = null;
let cachedAutoLinkOptions: { detectIp: boolean; allowPrivateDomains: boolean; validHosts: string[] };

export const autoLink = (src: string, customDomains?: string[]) => {
    /* Implementation Hidden */
};

const autoEmailTldOptions = { detectIp: false, allowPrivateDomains: true } as const;

export const autoEmail = (src: string) => {
    /* Implementation Hidden */
};

export const image = (() => {
	const fn = generate('IMAGE');
	return (src: string, label?: Markup) => fn({ src: plain(src), label: label || plain(src) });
})();

export const quote = generate('QUOTE');
export const spoilerBlock = generate('SPOILER_BLOCK');

export const mentionChannel = (() => {
	const fn = generate('MENTION_CHANNEL');
	return (value: string) => fn(plain(value));
})();

export const orderedList = generate('ORDERED_LIST');

export const unorderedList = generate('UNORDERED_LIST');

export const listItem = (text: Inlines[], number?: number): ListItem => ({
	type: 'LIST_ITEM',
	value: text,
	...(number !== undefined && { number }),
});

// GFM trims leading/trailing whitespace of each table cell's content
const trimCellContent = (value: Inlines[]): Inlines[] => {
    /* Implementation Hidden */
};

const tableCell = (value: Inlines[], align: TableCell['align']): TableCell => ({
	type: 'TABLE_CELL',
	align,
	value: trimCellContent(value),
});

export const table = (header: Inlines[][], aligns: Array<TableCell['align']>, rows: Inlines[][][], fallback?: SourceRange): Table => ({
	type: 'TABLE',
	value: {
		header: header.map((cell, index) => tableCell(cell, aligns[index])),
		rows: rows.map(
			(cells): TableRow => ({
				type: 'TABLE_ROW',
				// Normalize each row to the header's column count: pad missing cells and
				// drop extras, so ragged GFM rows stay aligned with the header/delimiter.
				value: header.map((_, index) => tableCell(cells[index] ?? [], aligns[index])),
			}),
		),
	},
	...(fallback !== undefined && { fallback }),
});

export const mentionUser = (() => {
	const fn = generate('MENTION_USER');
	return (value: string) => fn(plain(value));
})();

export const emoji = (shortCode: string): Emoji => ({
	type: 'EMOJI',
	value: plain(shortCode),
	shortCode,
});

export const emojiUnicode = (unicode: string): Emoji => ({
	type: 'EMOJI',
	value: undefined,
	unicode,
});

export const emoticon = (emoticon: string, shortCode: string): Emoji => ({
	type: 'EMOJI',
	value: plain(emoticon),
	shortCode,
});

const joinEmoji = (current: Inlines, previous: Inlines | undefined, next: Inlines | undefined): Inlines => {
    /* Implementation Hidden */
};

export const reducePlainTexts = (values: Paragraph['value']): Paragraph['value'] => {
    /* Implementation Hidden */
};
export const lineBreak = (): LineBreak => ({
	type: 'LINE_BREAK',
	value: undefined,
});

export const horizontalRule = (fallback?: SourceRange): HorizontalRule => ({
	type: 'HORIZONTAL_RULE',
	value: undefined,
	...(fallback !== undefined && { fallback }),
});

export const katex = (content: string): KaTeX => ({
	type: 'KATEX',
	value: content,
});

export const inlineKatex = (content: string): InlineKaTeX => ({
	type: 'INLINE_KATEX',
	value: content,
});

export const phoneChecker = (text: string, number: string) => {
    /* Implementation Hidden */
};

export const timestamp = (value: string, type?: 't' | 'T' | 'd' | 'D' | 'f' | 'F' | 'R', fallback?: SourceRange): Timestamp => {
    /* Implementation Hidden */
};

export const timestampFromHours = (hours: string, minutes = '00', seconds = '00', timezone = '') => {
    /* Implementation Hidden */
};

export const timestampFromIsoTime = ({
	year,
	month,
	day,
	hours,
	minutes,
	seconds,
	milliseconds,
	timezone,
}: {
	year: string;
	month: string;
	day: string;
	hours: string;
	minutes: string;
	seconds: string;
	milliseconds?: string;
	timezone?: string;
}) => {
    /* Implementation Hidden */
};

```