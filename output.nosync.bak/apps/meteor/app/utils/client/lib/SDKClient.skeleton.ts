## File: apps/meteor/app/utils/client/lib/SDKClient.ts

```typescript
import type { RestClientInterface } from '@rocket.chat/api-client';
import type { SDK, ClientStream, StreamKeys, StreamNames, StreamerCallbackArgs, ServerMethods } from '@rocket.chat/ddp-client';
import { Emitter } from '@rocket.chat/emitter';
import { Meteor } from 'meteor/meteor';

import { APIClient } from './RestApiClient';
import { parseDDP } from '../../../../client/lib/sdk/ddpProtocol';
import { ensureConnectedAndAuthenticated, getDdpSdk } from '../../../../client/lib/sdk/ddpSdk';
import { isSdkTransportEnabled } from '../../../../client/lib/sdk/sdkTransportEnabled';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface SDK {
		stream<N extends StreamNames, K extends StreamKeys<N>>(
			streamName: N,
			args: [key: K, ...args: unknown[]],
			callback: (...args: StreamerCallbackArgs<N, K>) => void,
		): ReturnType<ClientStream['subscribe']>;
		onAnyStreamEvent<N extends StreamNames>(name: N, callback: (eventName: string, args: unknown[]) => void): { stop: () => void };
		call<T extends keyof ServerMethods>(method: T, ...args: Parameters<ServerMethods[T]>): Promise<ReturnType<ServerMethods[T]>>;
	}
}

const sdkTransportEnabled = isSdkTransportEnabled();

const isChangedCollectionPayload = (
	msg: any,
): msg is { msg: 'changed'; collection: string; fields: { eventName: string; args: unknown[] } } => {
    /* Implementation Hidden */
};

type EventMap<N extends StreamNames = StreamNames, K extends StreamKeys<N> = StreamKeys<N>> = {
	[key in `stream-${N}/${K}`]: StreamerCallbackArgs<N, K>;
};

type StreamMapValue = {
	stop: () => void;
	onError: (cb: (...args: any[]) => void) => () => void;
	onChange: ReturnType<ClientStream['subscribe']>['onChange'];
	onStop: (cb: () => void) => () => void;
	ready: () => Promise<void>;
	isReady: boolean;
	unsubList: Set<() => void>;
};

const createNewMeteorStream = (streamName: StreamNames, key: StreamKeys<StreamNames>, args: unknown[]): StreamMapValue => {
    /* Implementation Hidden */
};

const createNewDdpSdkStream = (
	streamProxy: Emitter<EventMap>,
	streamName: StreamNames,
	key: StreamKeys<StreamNames>,
	args: unknown[],
): StreamMapValue => {
    /* Implementation Hidden */
};

const createStreamManager = () => {
    /* Implementation Hidden */
};

// Per-stream wildcard emitters for `onAnyStreamEvent`. Each emitter is fed by
// up to two sources (de-duplicated by the underlying bridges):
//   1) `getDdpSdk().client.onCollection(...)` — the canonical bridge. Covers
//      both transport-OFF (via `meteorBackedSdk.onCollection`, which listens
//      on `Meteor.connection._stream`) and transport-ON (via the real DDPSDK
//      socket).
//   2) When SDK transport is ON, a direct `Meteor.connection._stream` bridge
//      to catch frames that land on Meteor while the SDK socket is still
//      authenticating — see `apps/meteor/client/lib/presence.ts`'s fallback
//      to `Meteor.subscribe('stream-user-presence', ...)`. This is the
//      "artificial trigger" and is TEMPORARY: it disappears once SDK
//      transport rollout completes and the Meteor fallback is removed.
//
// Bridges are wired exactly once per stream name (singleton listeners on the
// underlying Meteor stream — Meteor's `on()` has no `off()`, so we can't
// detach them per subscription anyway). Consumers register/unregister on the
// per-stream Emitter, which DOES support `off`, so unsubscription is clean.
const anyStreamEmitters = new Map<string, Emitter<Record<string, [eventName: string, args: unknown[]]>>>();
const anyStreamBridged = new Set<string>();

const createOnAnyStreamEvent = () => {
    /* Implementation Hidden */
};

export const createSDK = (rest: RestClientInterface) => {
    /* Implementation Hidden */
};

export const sdk = createSDK(APIClient);

```