## File: apps/meteor/client/views/room/Room.tsx

```typescript
import { FocusScope } from '@react-aria/focus';
import { isInviteSubscription } from '@rocket.chat/core-typings';
import { ContextualbarSkeleton } from '@rocket.chat/ui-client';
import { useSetting, useRoomToolbox, useUserId } from '@rocket.chat/ui-contexts';
import { useMediaCallOpenRoomTracker } from '@rocket.chat/ui-voip';
import { createElement, lazy, memo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import RoomE2EESetup from './E2EESetup/RoomE2EESetup';
import Header from './Header';
import MessageHighlightProvider from './MessageList/providers/MessageHighlightProvider';
import RoomInvite from './RoomInvite';
import MediaCallRoom from './body/MediaCallRoom';
import RoomBody from './body/RoomBody';
import { useRoom, useRoomSubscription } from './contexts/RoomContext';
import { useAppsContextualBar } from './hooks/useAppsContextualBar';
import RoomLayout from './layout/RoomLayout';
import ChatProvider from './providers/ChatProvider';
import { DateListProvider } from './providers/DateListProvider';
import { SelectedMessagesProvider } from './providers/SelectedMessagesProvider';
import GenericError from '../../components/GenericError';

const UiKitContextualBar = lazy(() => import('./contextualBar/uikit/UiKitContextualBar'));

const Room = () => {
    /* Implementation Hidden */
};

export default memo(Room);

```