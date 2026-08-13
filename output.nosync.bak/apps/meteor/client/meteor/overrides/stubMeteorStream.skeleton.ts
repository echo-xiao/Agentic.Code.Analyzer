## File: apps/meteor/client/meteor/overrides/stubMeteorStream.ts

```typescript
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { type DDPMessage, parseDDP, stringifyDDP } from '../../lib/sdk/ddpProtocol';
import { adoptAccountFromMeteorLoginResult, getDdpSdk } from '../../lib/sdk/ddpSdk';
import { isSdkTransportEnabled } from '../../lib/sdk/sdkTransportEnabled';

/**
 * Replace Meteor.connection._stream with a stub that pretends to be a
 * connected DDP stream and forwards outbound frames through the DDPSDK
 * socket. The goal: only one WebSocket per page (the DDPSDK one). Meteor
 * still owns its Connection / MethodInvoker / _streamHandlers machinery —
 * we just swap the transport underneath.
 *
 * What goes through here:
 *  - method frames bypassed by ddpOverREST (login resume, UserPresence:*,
 *    setUserStatus, logout) — routed via the SDK socket so they hit
 *    ddp-streamer's native handlers.
 *  - sub/unsub frames Meteor sends internally (resubscriptions on reset,
 *    bootstrap subs that escape Meteor.connection.subscribe) — routed via
 *    the SDK socket; the responses (ready/nosub/added/changed) are bridged
 *    back to Meteor's _streamHandlers in ddpSdkCollectionBridge.
 *  - ping frames from Meteor's heartbeat — answered locally with a synthetic
 *    pong fed back into _streamHandlers so the heartbeat stays satisfied.
 *  - connect/pong frames — discarded; the SDK socket has its own handshake.
 */

if (isSdkTransportEnabled()) {
	installStubMeteorStream();
}

function installStubMeteorStream(): void {
    /* Implementation Hidden */
}

```