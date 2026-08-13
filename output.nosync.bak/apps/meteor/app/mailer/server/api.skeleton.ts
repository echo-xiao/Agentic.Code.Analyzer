## File: apps/meteor/app/mailer/server/api.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import type { ISetting } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';
import { escapeHTML } from '@rocket.chat/string-helpers';
import { validateEmail } from '@rocket.chat/tools';
import juice from 'juice';
import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';
import { stripHtml } from 'string-strip-html';
import _ from 'underscore';

import { replaceVariables } from './replaceVariables';
import { strLeft, strRightBack } from '../../../lib/utils/stringUtils';
import { i18n } from '../../../server/lib/i18n';
import { notifyOnSettingChanged } from '../../lib/server/lib/notifyListener';
import { settings } from '../../settings/server';

let contentHeader: string | undefined;
let contentFooter: string | undefined;
let body: string | undefined;

// define server language for email translations
// @TODO: change TAPi18n.__ function to use the server language by default
let lng = 'en';
settings.watch<string>('Language', (value) => {
	lng = value || 'en';
});

export const replacekey = (str: string, key: string, value = ''): string =>
	str.replace(new RegExp(`(\\[${key}\\]|__${key}__)`, 'igm'), value);

export const translate = (str: string): string => replaceVariables(str, (_match, key) => i18n.t(key, { lng }));

export const replace = (str: string, data: { [key: string]: unknown } = {}): string => {
    /* Implementation Hidden */
};

const nonEscapeKeys = ['room_path'];

export const replaceEscaped = (str: string, data: { [key: string]: unknown } = {}): string => {
    /* Implementation Hidden */
};

export const wrap = (html: string, data: { [key: string]: unknown } = {}): string => {
    /* Implementation Hidden */
};

export const inlinecss = (html: string): string => {
    /* Implementation Hidden */
};

export const getTemplate = (template: ISetting['_id'], fn: (html: string) => void, escape = true): void => {
    /* Implementation Hidden */
};

export const getTemplateWrapped = (template: ISetting['_id'], fn: (html: string) => void): void => {
    /* Implementation Hidden */
};

settings.watchMultiple(['Email_Header', 'Email_Footer'], () => {
	getTemplate(
		'Email_Header',
		(value) => {
			contentHeader = replace(value || '');
			body = inlinecss(`${contentHeader} {{body}} ${contentFooter}`);
		},
		false,
	);

	getTemplate(
		'Email_Footer',
		(value) => {
			contentFooter = replace(value || '');
			body = inlinecss(`${contentHeader} {{body}} ${contentFooter}`);
		},
		false,
	);

	body = inlinecss(`${contentHeader} {{body}} ${contentFooter}`);
});

export const checkAddressFormat = (adresses: string | string[]): boolean =>
	([] as string[]).concat(adresses).every((address) => validateEmail(address));

export const sendNoWrap = async ({
	to,
	from,
	replyTo,
	subject,
	html,
	text,
	headers,
}: {
	to: string | string[];
	from: string;
	replyTo?: string;
	subject: string;
	html?: string;
	text?: string;
	headers?: string;
}) => {
    /* Implementation Hidden */
};

export const send = async ({
	to,
	from,
	replyTo,
	subject,
	html,
	text,
	data,
	headers,
}: {
	to: string | string[];
	from: string;
	replyTo?: string;
	subject: string;
	html?: string;
	text?: string;
	headers?: string;
	data?: { [key: string]: unknown };
}): Promise<void> =>
	sendNoWrap({
		to,
		from,
		replyTo,
		subject: replace(subject, data),
		text: (text && replace(text, data)) || (html && stripHtml(replace(html, data)).result) || undefined,
		html: html ? wrap(html, data) : undefined,
		headers,
	});

// Needed because of https://github.com/microsoft/TypeScript/issues/36931
type Assert = (input: string, func: string) => asserts input;
export const checkAddressFormatAndThrow: Assert = (from: string, func: string): asserts from => {
    /* Implementation Hidden */
};

export const getHeader = (): string | undefined => contentHeader;

export const getFooter = (): string | undefined => contentFooter;

```