## File: apps/meteor/server/bridges/irc/irc-bridge/peerHandlers/index.ts

```typescript
import disconnected from './disconnected';
import joinedChannel from './joinedChannel';
import leftChannel from './leftChannel';
import nickChanged from './nickChanged';
import sentMessage from './sentMessage';
import userRegistered from './userRegistered';

export { disconnected, joinedChannel, leftChannel, nickChanged, sentMessage, userRegistered };

```