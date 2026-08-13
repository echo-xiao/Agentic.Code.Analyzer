## File: apps/meteor/app/markdown/lib/markdown.js

```typescript
/*
 * Markdown is a named function that will parse markdown syntax
 * @param {Object} message - The message object
 */
import { escapeHTML } from '@rocket.chat/string-helpers';
import { Meteor } from 'meteor/meteor';

import { filtered } from './parser/filtered/filtered';
import { code } from './parser/original/code';
import { original } from './parser/original/original';

const parsers = {
	original,
	filtered,
};

class MarkdownClass {
	parse(text) {
        /* Implementation Hidden */
    }

	parseNotEscaped(text) {
        /* Implementation Hidden */
    }

	parseMessageNotEscaped(message) {
        /* Implementation Hidden */
    }

	mountTokensBackRecursively(message, tokenList, useHtml = true) {
        /* Implementation Hidden */
    }

	mountTokensBack(message, useHtml = true) {
        /* Implementation Hidden */
    }

	code(...args) {
        /* Implementation Hidden */
    }

	/** @param {string} message */
	filterMarkdownFromMessage(message) {
        /* Implementation Hidden */
    }
}

export const Markdown = new MarkdownClass();

/** @param {string} message */
export const filterMarkdown = (message) => Markdown.filterMarkdownFromMessage(message);

export const createMarkdownMessageRenderer = ({ ...options }) => {
    /* Implementation Hidden */
};

export const createMarkdownNotificationRenderer = () => (message) => parsers.filtered(message);

```