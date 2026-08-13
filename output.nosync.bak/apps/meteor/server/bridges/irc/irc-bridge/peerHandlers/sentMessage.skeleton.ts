## File: apps/meteor/server/bridges/irc/irc-bridge/peerHandlers/sentMessage.js

```typescript
import { Users, Rooms } from '@rocket.chat/models';

import { sendMessage } from '../../../../lib/messages/sendMessage';
import { createDirectRoom } from '../../../../lib/rooms/createDirectRoom';

/*
 *
 * Get direct chat room helper
 *
 *
 */
const getDirectRoom = async (source, target) => {
    /* Implementation Hidden */
};

export default async function handleSentMessage(args) {
    /* Implementation Hidden */
}

```