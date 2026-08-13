## File: apps/meteor/lib/getSubscriptionUnreadData.ts

```typescript
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import type { TFunction } from 'i18next';

const getUnreadTitle = (
	{
		mentions,
		threads,
		groupMentions,
		total,
	}: {
		mentions: number;
		threads: number;
		groupMentions: number;
		total: number;
	},
	t: TFunction,
) => {
    /* Implementation Hidden */
};

export type UnreadData = Pick<
	SubscriptionWithRoom,
	'alert' | 'userMentions' | 'unread' | 'tunread' | 'tunreadUser' | 'groupMentions' | 'hideMentionStatus' | 'hideUnreadStatus'
>;

export const getSubscriptionUnreadData = (
	{ userMentions, tunreadUser, tunread, unread, groupMentions, hideMentionStatus, hideUnreadStatus, alert }: UnreadData,
	t: TFunction,
) => {
    /* Implementation Hidden */
};

```