## File: apps/meteor/client/components/GazzodownText.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import type { ChannelMention, UserMention } from '@rocket.chat/gazzodown';
import { MarkupInteractionContext } from '@rocket.chat/gazzodown';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { useLayout, useRouter, useUserPreference, useUserId, useUserCard } from '@rocket.chat/ui-contexts';
import type { UIEvent, ReactNode } from 'react';
import { useCallback, memo, useMemo } from 'react';

import { normalizeUsername } from '../../lib/utils/normalizeUsername';
import { detectEmoji } from '../lib/utils/detectEmoji';
import { fireGlobalEvent } from '../lib/utils/fireGlobalEvent';
import { useMessageListHighlights, useMessageListShowRealName } from './message/list/MessageListContext';
import { useGoToRoom } from '../views/room/hooks/useGoToRoom';

export type GazzodownTextProps = {
	children: ReactNode;
	mentions?: {
		type?: 'user' | 'team';
		_id: string;
		username?: string;
		name?: string;
	}[];
	channels?: Pick<IRoom, '_id' | 'name'>[];
	searchText?: string;
};

const GazzodownText = ({ mentions, channels, searchText, children }: GazzodownTextProps) => {
    /* Implementation Hidden */
};

export default memo(GazzodownText);

```