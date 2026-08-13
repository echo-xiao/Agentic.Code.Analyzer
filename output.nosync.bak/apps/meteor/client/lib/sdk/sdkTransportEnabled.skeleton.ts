## File: apps/meteor/client/lib/sdk/sdkTransportEnabled.ts

```typescript
const KEY = 'sdk_transport';
const META_NAME = 'rc-sdk-transport-enabled';

/**
 * Runtime flag that gates the SDK-over-DDP transport migration. Three sources,
 * checked in order:
 *   1. URL parameter `?sdk_transport=on|off` — per-tab override (highest).
 *   2. `rc-config-sdk_transport` in localStorage — persisted per-user opt-in.
 *   3. `<meta name="rc-sdk-transport-enabled" content="on|off">` injected by
 *      the server from the `SDK_DDP_Transport_Enabled` admin setting — global
 *      opt-in / kill-switch.
 *
 * Default is `false` (legacy Meteor DDP transport) when none of the three
 * resolves, so the migration ships dormant for staged rollout.
 */
export const isSdkTransportEnabled = (): boolean => {
    /* Implementation Hidden */
};

```