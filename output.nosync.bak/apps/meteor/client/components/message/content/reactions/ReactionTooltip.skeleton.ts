## File: apps/meteor/client/components/message/content/reactions/ReactionTooltip.tsx

```typescript
import { Skeleton } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useGetMessageByID } from '../../../../views/room/contextualBar/Threads/hooks/useGetMessageByID';
import MarkdownText from '../../../MarkdownText';

export type ReactionTooltipProps = {
	emojiName: string;
	usernames: string[];
	username: string | undefined;
	mine: boolean;
	showRealName: boolean;
	messageId: string;
};

const getTranslationKey = (users: string[], mine: boolean): TranslationKey => {
    /* Implementation Hidden */
};

const ReactionTooltip = ({ emojiName, usernames, mine, messageId, showRealName, username }: ReactionTooltipProps) => {
    /* Implementation Hidden */
};

export default ReactionTooltip;

```