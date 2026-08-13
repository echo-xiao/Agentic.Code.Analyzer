## File: apps/meteor/client/views/room/contextualBar/Threads/ThreadList.tsx

```typescript
import type { IMessage, IThreadMainMessage } from '@rocket.chat/core-typings';
import { Box, Icon, TextInput, Select, Callout, Throbber } from '@rocket.chat/fuselage';
import { useResizeObserver, useAutoFocus, useLocalStorage, useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import {
	VirtualizedScrollbars,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarEmptyContent,
	ContextualbarSection,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useTranslation, useUserId, useRoomToolbox } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useMemo, useState, useCallback, useId } from 'react';
import { Virtuoso } from 'react-virtuoso';

import ThreadListItem from './components/ThreadListItem';
import { useThreadsList } from './hooks/useThreadsList';
import ResultsLiveRegion from '../../../../components/ResultsLiveRegion';
import { getErrorMessage } from '../../../../lib/errorHandling';
import { useRoom, useRoomSubscription } from '../../contexts/RoomContext';
import { useGoToThread } from '../../hooks/useGoToThread';

type ThreadType = 'all' | 'following' | 'unread';

// TODO: Refactor this component to isolate the data from the visual
const ThreadList = () => {
    /* Implementation Hidden */
};

export default ThreadList;

```