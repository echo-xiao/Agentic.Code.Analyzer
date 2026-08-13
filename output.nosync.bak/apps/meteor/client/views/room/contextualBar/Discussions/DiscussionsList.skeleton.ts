## File: apps/meteor/client/views/room/contextualBar/Discussions/DiscussionsList.tsx

```typescript
import type { IDiscussionMessage } from '@rocket.chat/core-typings';
import { Box, Icon, TextInput, Callout, Throbber } from '@rocket.chat/fuselage';
import { useAutoFocus } from '@rocket.chat/fuselage-hooks';
import {
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarContent,
	ContextualbarClose,
	ContextualbarEmptyContent,
	ContextualbarTitle,
	ContextualbarSection,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import type { ChangeEvent, MouseEvent, RefObject } from 'react';
import { useCallback, useId } from 'react';
import { useTranslation } from 'react-i18next';

import DiscussionsListRow from './DiscussionsListRow';
import { PaginatedVirtualList } from '../../../../components/PaginatedVirtualList';
import ResultsLiveRegion from '../../../../components/ResultsLiveRegion';
import { useGoToRoom } from '../../hooks/useGoToRoom';

type DiscussionsListProps = {
	itemCount: number;
	discussions: Array<IDiscussionMessage>;
	loadMoreItems: UseInfiniteQueryResult['fetchNextPage'];
	isPending: boolean;
	isSuccess: boolean;
	onClose: () => void;
	error: unknown;
	text: string;
	onChangeFilter: (e: ChangeEvent<HTMLInputElement>) => void;
};

function DiscussionsList({
	itemCount,
	discussions = [],
	loadMoreItems,
	isPending,
	isSuccess,
	onClose,
	error,
	text,
	onChangeFilter,
}: DiscussionsListProps) {
    /* Implementation Hidden */
}

export default DiscussionsList;

```