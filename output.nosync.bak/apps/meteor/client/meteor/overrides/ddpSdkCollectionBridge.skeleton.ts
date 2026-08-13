## File: apps/meteor/client/meteor/overrides/ddpSdkCollectionBridge.ts

```typescript
import { Meteor } from 'meteor/meteor';

import { type DDPMessage, stringifyDDP } from '../../lib/sdk/ddpProtocol';
import { getDdpSdk } from '../../lib/sdk/ddpSdk';
import { isSdkTransportEnabled } from '../../lib/sdk/sdkTransportEnabled';

/**
 * Bridge incoming DDPSDK frames into Meteor.connection's collection dispatch.
 *
 * Without this, routing Meteor.apply methods through DDPSDK would leave the
 * application in a broken state: Meteor-registered collections (Meteor.users,
 * every Mongo.Collection subscribers of the Meteor.connection publications,
 * etc.) only react to frames they receive on Meteor.connection's own socket.
 * A successful login via the DDPSDK socket pushes the current user document
 * and follow-up subscription payloads on that socket — not Meteor's — so the
 * Users Zustand store (exposed as Meteor.users through userAndUsers.ts)
 * never populates and useMainReady stays false.
 *
 * By tapping DDPSDK's MinimalDDPClient.onMessage, we selectively re-feed
 * collection-mutation, ready and nosub messages through
 * Meteor.connection._streamHandlers.onMessage, reusing Meteor's dispatch
 * logic for _stores without having to duplicate it.
 *
 * Method results / updated / heartbeat frames are NOT re-emitted — those are
 * already handled by either Meteor's own invokers (when the method went
 * through Meteor.connection) or by ddpOverSDK's processResult (when it went
 * through DDPSDK). Duplicating them would confuse Meteor's invoker state.
 */

type ParsedDdpFrame = { msg?: string; id?: unknown; methods?: unknown } & Record<string, unknown>;

const COLLECTION_FRAMES = new Set(['added', 'changed', 'removed', 'addedBefore', 'movedBefore']);
const SUBSCRIPTION_LIFECYCLE_FRAMES = new Set(['ready', 'nosub']);

// SDK-internal ids are 'rc-ddp-client-N'; Meteor's are numeric strings ('1',
// '2', ...). Method-result frames addressed to SDK-internal ids must NOT
// reach Meteor's _streamHandlers — Meteor's `updated` handler throws "No
// callback invoker for method ..." when the id is missing from
// _methodInvokers (document_processors.js:168). Filter those out at the
// bridge so SDK's own callAsync flows aren't surfaced into Meteor.
const isSdkInternalId = (id: unknown): boolean => typeof id === 'string' && id.startsWith('rc-ddp-client-');

const shouldBridgeToMeteor = (frame: ParsedDdpFrame): boolean => {
    /* Implementation Hidden */
};

export const installDdpSdkCollectionBridge = (): void => {
    /* Implementation Hidden */
};

if (isSdkTransportEnabled()) {
	installDdpSdkCollectionBridge();
}

```