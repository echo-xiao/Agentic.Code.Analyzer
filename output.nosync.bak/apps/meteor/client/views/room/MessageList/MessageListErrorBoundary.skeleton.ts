## File: apps/meteor/client/views/room/MessageList/MessageListErrorBoundary.tsx

```typescript
import { States, StatesIcon, StatesTitle, StatesSubtitle, StatesActions, StatesAction, Icon } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../contexts/RoomContext';

export type MessageListErrorBoundaryProps = { children: ReactNode };

const MessageListErrorBoundary = ({ children }: MessageListErrorBoundaryProps) => {
    /* Implementation Hidden */
};

export default MessageListErrorBoundary;

```