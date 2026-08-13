## File: apps/meteor/app/markdown/lib/parser/original/markdown.js

```typescript
import { addAsToken, isToken, validateAllowedTokens } from './token';

const validateUrl = (url, message) => {
    /* Implementation Hidden */
};

const endsWithWhitespace = (text) => text.substring(text.length - 1).match(/\s/);

const getParseableMarkersCount = (start, end) => {
    /* Implementation Hidden */
};

const getTextWrapper = (marker, tagName) => (textPrepend, wrappedText, textAppend) =>
	`${textPrepend}<span class="copyonly">${marker}</span><${tagName}>${wrappedText}</${tagName}><span class="copyonly">${marker}</span>${textAppend}`;

const getRegexReplacer = (replaceFunction, getRegex) => (marker, tagName) => {
	const wrapper = getTextWrapper(marker, tagName);
	return (msg) => msg.replace(getRegex(marker), (...args) => replaceFunction(wrapper, ...args));
};

const getParserWithCustomMarker = getRegexReplacer(
	(wrapper, match, p1, p2, p3) => {
		if (endsWithWhitespace(p2)) {
			return match;
		}
		const finalMarkerCount = getParseableMarkersCount(p1, p3);
		return wrapper(p1.substring(finalMarkerCount), p2, p3.substring(finalMarkerCount));
	},
	(marker) => new RegExp(`(\\${marker}+(?!\\s))([^\\${marker}\\r\\n]+)(\\${marker}+)`, 'gm'),
);

const parseBold = getParserWithCustomMarker('*', 'strong');

const parseStrike = getParserWithCustomMarker('~', 'strike');

const parseItalic = getRegexReplacer(
	(wrapper, match, p1, p2, p3, p4, p5) => {
		if (p1 || p5 || endsWithWhitespace(p3)) {
			return match;
		}

		const finalMarkerCount = getParseableMarkersCount(p2, p4);
		return wrapper(p2.substring(finalMarkerCount), p3, p4.substring(finalMarkerCount));
	},
	() => new RegExp('([^\\r\\n\\s~*_]){0,1}(\\_+(?!\\s))([^\\_\\r\\n]+)(\\_+)([^\\r\\n\\s]){0,1}', 'gm'),
)('_', 'em');

const parseNotEscaped = (message, { supportSchemesForLink, headers, rootUrl }) => {
    /* Implementation Hidden */
};

export const markdown = (message, options) => {
    /* Implementation Hidden */
};

```