## File: apps/meteor/client/meteor/overrides/ddpOverREST.ts

```typescript
import { Meteor } from 'meteor/meteor';

import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { parseDDP, stringifyDDP } from '../../lib/sdk/ddpProtocol';
import { clearStoredCredentials } from '../../lib/sdk/ddpSdk';
import { getUserId } from '../../lib/user';

const bypassMethods: string[] = ['setUserStatus', 'logout'];

const isResumeLogin = ({ method, params }: Meteor.IDDPMessage): boolean => method === 'login' && Boolean(params?.[0]?.resume);

const shouldBypass = ({ msg, method, params }: Meteor.IDDPMessage): boolean => {
    /* Implementation Hidden */
};

const withDDPOverREST = (_send: (this: Meteor.IMeteorConnection, message: Meteor.IDDPMessage, ...args: unknown[]) => void) => {
    /* Implementation Hidden */
};

// Wrap `_send` unconditionally — develop already routed all non-bypassed
// methods (including user/password login) through REST. In MS the WS
// connects to `ddp-streamer-service`, whose native `login` handler only
// accepts `{ resume }` tokens and 403s everything else; routing login via
// REST hits `rocketchat-main` directly so the full
// `Accounts.registerLoginHandler` chain runs.
Meteor.connection._send = withDDPOverREST(Meteor.connection._send);

```