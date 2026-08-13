## File: apps/meteor/server/lib/parseMessageSearchQuery.ts

```typescript
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Filter, FindOptions } from 'mongodb';

class MessageSearchQueryParser {
	private query: Exclude<Filter<IMessage>, Partial<IMessage>> = {};

	private options: FindOptions<IMessage> = {
		projection: {},
		sort: {
			ts: -1,
		},
		skip: 0,
		limit: 20,
	};

	private user: IUser | undefined;

	private forceRegex = false;

	constructor({
		user,
		offset = 0,
		limit = 20,
		forceRegex = false,
	}: {
		user?: IUser;
		offset?: number;
		limit?: number;
		forceRegex?: boolean;
	}) {
        /* Implementation Hidden */
    }

	private consumeFrom(text: string) {
        /* Implementation Hidden */
    }

	private consumeMention(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter on messages that are starred by the current user.
	 */
	private consumeHasStar(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter on messages that have an url.
	 */
	private consumeHasUrl(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter on pinned messages.
	 */
	private consumeIsPinned(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter on messages which have a location attached.
	 */
	private consumeHasLocation(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter image tags
	 */
	private consumeLabel(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter on description of messages.
	 */
	private consumeFileDescription(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter on title of messages.
	 */
	private consumeFileTitle(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter on messages that have been sent before a date.
	 */
	private consumeBefore(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter on messages that have been sent after a date.
	 */
	private consumeAfter(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Filter on messages that have been sent on a date.
	 */
	private consumeOn(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Sort by timestamp.
	 */
	consumeOrder(text: string) {
        /* Implementation Hidden */
    }

	/**
	 * Query in message text
	 */
	private consumeMessageText(text: string) {
        /* Implementation Hidden */
    }

	parse(text: string) {
        /* Implementation Hidden */
    }
}

/**
 * Parses a message search query and returns a MongoDB query and options
 * @param text The query text
 * @param options The options
 * @param options.user The user object
 * @param options.offset The offset
 * @param options.limit The limit
 * @param options.forceRegex Whether to force the use of regex
 * @returns The MongoDB query and options
 * @private
 * @example
 * const { query, options } = parseMessageSearchQuery('from:rocket.cat', {
 * 	user: await Meteor.userAsync(),
 * 	offset: 0,
 * 	limit: 20,
 * 	forceRegex: false,
 * });
 */
export function parseMessageSearchQuery(
	text: string,
	{
		user,
		offset = 0,
		limit = 20,
		forceRegex = false,
	}: {
		user?: IUser;
		offset?: number;
		limit?: number;
		forceRegex?: boolean;
	},
) {
    /* Implementation Hidden */
}

```