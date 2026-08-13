## File: apps/meteor/server/bridges/irc/irc-bridge/peerHandlers/joinedChannel.js

```typescript
import { Users, Rooms } from '@rocket.chat/models';

import { addUserToRoom } from '../../../../lib/rooms/addUserToRoom';
import { createRoom } from '../../../../lib/rooms/createRoom';

// TODO doesn't seem to be used anywhere, remove
export default async function handleJoinedChannel(args) {
    /* Implementation Hidden */
}

```