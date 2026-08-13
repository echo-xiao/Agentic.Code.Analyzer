## File: ee/packages/federation-matrix/src/helpers/message.parsers.ts

```typescript
import type { EventID, HomeserverEventSignatures } from '@rocket.chat/federation-sdk';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

type MatrixMessageContent = HomeserverEventSignatures['homeserver.matrix.message']['event']['content'] & { format?: string };

type MatrixEvent = {
	content?: { body?: string; formatted_body?: string };
	event_id: string;
	sender: string;
};

const MATRIX_TO_URL = 'https://matrix.to/#/';
const MATRIX_QUOTE_TAGS = ['mx-reply', 'blockquote'];
const REGEX = {
	anchor: /<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, // <a href="https://matrix.to/#/@user:server.com">@user:server.com</a>
	externalUsers: /@([0-9a-zA-Z-_.]+(@([0-9a-zA-Z-_.]+))?):+([0-9a-zA-Z-_.]+)(?=[^<>]*(?:<\w|$))/gm, // @username:server.com
	internalUsers: /(?:^|(?<=\s))@([0-9a-zA-Z-_.]+(@([0-9a-zA-Z-_.]+))?)(?=[^<>]*(?:<\w|$))/gm, // @username
	general: /(@all)|(@here)/gm,
};

const escapeHtml = (text: string): string =>
	text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c] || c);

const stripHtml = (html: string, keep: string[] = []): string => sanitizeHtml(html, { allowedTags: keep.includes('a') ? ['a'] : [] });

const createMentionHtml = (id: string): string => `<a href="${MATRIX_TO_URL}${id}">${id}</a>`;

const extractAnchors = (html: string) => Array.from(html.matchAll(REGEX.anchor), ([, href, text]) => ({ href, text }));

const extractMentions = (html: string, homeServerDomain: string, senderExternalId: string) =>
	extractAnchors(html)
		.filter(({ href, text }) => href?.includes(MATRIX_TO_URL) && text)
		.map(({ href, text }) => {
			const userMatch = href.match(/@([^:]+):(.+)/);
			if (!userMatch) {
				return { mention: '@all', realName: text };
			}

			const [, usernameWithoutDomain, serverDomain] = userMatch;
			const localUsername = `@${usernameWithoutDomain}`;
			const fullUsername = `@${usernameWithoutDomain}:${serverDomain}`;
			const mention = serverDomain === homeServerDomain ? localUsername : fullUsername;
			const realName = senderExternalId === text ? localUsername : text;
			return { mention, realName };
		});

const replaceMentions = (message: string, mentions: Array<{ mention: string; realName: string }>): string => {
    /* Implementation Hidden */
};

const replaceWithMentionPills = async (message: string, regex: RegExp, createPill: (match: string) => string): Promise<string> => {
    /* Implementation Hidden */
};

const stripQuotePrefix = (message: string): string => {
    /* Implementation Hidden */
};

const createReplyContent = (roomId: string, event: MatrixEvent, textBody: string, htmlBody: string): MatrixMessageContent => {
    /* Implementation Hidden */
};

export const toInternalMessageFormat = ({
	rawMessage,
	formattedMessage,
	homeServerDomain,
	senderExternalId,
}: {
	rawMessage: string;
	formattedMessage: string;
	homeServerDomain: string;
	senderExternalId: string;
}): string => replaceMentions(rawMessage, extractMentions(formattedMessage, homeServerDomain, senderExternalId));

export const toInternalQuoteMessageFormat = async ({
	homeServerDomain,
	formattedMessage,
	rawMessage,
	messageToReplyToUrl,
	senderExternalId,
}: {
	messageToReplyToUrl: string;
	formattedMessage: string;
	rawMessage: string;
	homeServerDomain: string;
	senderExternalId: string;
}): Promise<string> => {
    /* Implementation Hidden */
};

export const toExternalMessageFormat = async ({
	externalRoomId,
	homeServerDomain,
	message,
}: {
	message: string;
	externalRoomId: string;
	homeServerDomain: string;
}): Promise<string> => {
    /* Implementation Hidden */
};

export const toExternalQuoteMessageFormat = async ({
	message,
	eventToReplyTo,
	externalRoomId,
	homeServerDomain,
	originalEventSender,
}: {
	externalRoomId: string;
	eventToReplyTo: string;
	originalEventSender: string;
	message: string;
	homeServerDomain: string;
}): Promise<{ message: string; formattedMessage: string }> => {
    /* Implementation Hidden */
};

```