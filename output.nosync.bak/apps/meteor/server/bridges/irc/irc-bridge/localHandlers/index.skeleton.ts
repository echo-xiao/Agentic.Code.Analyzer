## File: apps/meteor/server/bridges/irc/irc-bridge/localHandlers/index.ts

```typescript
import onCreateRoom from './onCreateRoom';
import onCreateUser from './onCreateUser';
import onJoinRoom from './onJoinRoom';
import onLeaveRoom from './onLeaveRoom';
import onLogin from './onLogin';
import onLogout from './onLogout';
import onSaveMessage from './onSaveMessage';

export { onCreateRoom, onJoinRoom, onLeaveRoom, onLogin, onLogout, onSaveMessage, onCreateUser };

```