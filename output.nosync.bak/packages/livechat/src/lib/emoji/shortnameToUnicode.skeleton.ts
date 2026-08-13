## File: packages/livechat/src/lib/emoji/shortnameToUnicode.ts

```typescript
import ascii, { asciiRegexp } from './ascii';
import emojis from './emojis';

type EmojiShortname = keyof typeof emojis;
type EmojiASCIICode = keyof typeof ascii;

const shortnamePattern = new RegExp(/:[-+_a-z0-9]+:/, 'gi');
const regAscii = new RegExp(`((\\s|^)${asciiRegexp}(?=\\s|$|[!,.?]))`, 'gi');

const unescaped = {
	'&amp;': '&',
	'&#38;': '&',
	'&#x26;': '&',
	'&lt;': '<',
	'&#60;': '<',
	'&#x3C;': '<',
	'&gt;': '>',
	'&#62;': '>',
	'&#x3E;': '>',
	'&quot;': '"',
	'&#34;': '"',
	'&#x22;': '"',
	'&apos;': "'",
	'&#39;': "'",
	'&#x27;': "'",
} as const;

type HTMLEntity = keyof typeof unescaped;

const unescapeHTML = (string: string) => {
    /* Implementation Hidden */
};

const isAscii = (string: string): string is EmojiASCIICode => {
    /* Implementation Hidden */
};

const shortnameToUnicode = (stringMessage: string) => {
    /* Implementation Hidden */
};

export default shortnameToUnicode;

```