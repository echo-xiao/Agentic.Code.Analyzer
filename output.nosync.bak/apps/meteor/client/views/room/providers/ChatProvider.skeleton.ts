## File: apps/meteor/client/views/room/providers/ChatProvider.tsx

```typescript
import type { ReactNode } from 'react';

import { ChatContext } from '../contexts/ChatContext';
import { useRoom } from '../contexts/RoomContext';
import { useChatMessagesInstance } from './hooks/useChatMessagesInstance';

type ChatProviderProps = {
	children: ReactNode;
	tmid?: string;
};

const ChatProvider = ({ children, tmid }: ChatProviderProps) => {
    /* Implementation Hidden */
};

export default ChatProvider;

```