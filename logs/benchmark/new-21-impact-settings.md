# Impact of changing CachedSettings?

## Answer

`CachedSettings` is the central in-memory settings store used by virtually every module in Rocket.Chat. It is the primary interface through which server-side code reads configuration values. Changing it has the widest possible blast radius -- affecting authentication, permissions, notifications, UI behavior, integrations, and every other configurable subsystem.

### 1. What CachedSettings Does

**`apps/meteor/app/settings/server/CachedSettings.ts`, line 77:**
```ts
export class CachedSettings extends Emitter<...> implements ICachedSettings {
    ready = false;
    store = new Map<string, ISetting>();
```

It provides:
- **`get(id)`** (line 135) -- reads setting value from `this.store.get(id)?.value`, purely in-memory
- **`has(id)`** (line 109) -- checks if setting exists in cache
- **`getSetting(id)`** (line 121) -- returns full ISetting object
- **`set(record)`** -- updates the in-memory store and emits events
- **`watch(id, cb)`** (line 208) -- fires callback immediately with current value, then on every change
- **`watchMultiple(ids, cb)`** (line 165) -- watches multiple settings, debounced 100ms
- **`change(id, cb)`** -- subscribes to future changes only
- **`watchByRegex(regex, cb)`** -- watches all settings matching a regex
- **`onReady(cb)`** -- fires when settings initialization completes
- **`initialized()`** (line 95) -- marks cache as ready, emits `'ready'` event

### 2. Who Depends on CachedSettings

The `settings` singleton (exported from `apps/meteor/app/settings/server/`) is used across the entire codebase. Based on the code reviewed:

#### Authentication & Authorization
- LDAP configuration: `settings.get('LDAP_Enable')`, `settings.get('LDAP_Login_Fallback')`
- 2FA: `settings.get('Accounts_TwoFactorAuthentication_Enabled')`, `settings.get('Accounts_TwoFactorAuthentication_RememberFor')`
- LDAP Connection: reads dozens of LDAP_* settings for host, port, DN, filters

#### Messaging
- `sendMessage.ts`: `settings.get('Message_Read_Receipt_Enabled')`, `settings.get('Message_MaxAllowedSize')`
- `updateMessage.ts`: `settings.get('Message_KeepHistory')`
- `processSlashCommand.ts`: `settings.peek('Message_AllowUnrecognizedSlashCommand')`

#### Real-Time / Streaming
- ListenersModule: `settings.get('HexColorPreview_Enabled')`, `settings.get('Katex_Enabled')`, `settings.get('Message_CustomDomain_AutoLink')`

#### Omnichannel
- OmnichannelService: `settings.watchMultiple(['Livechat_enabled', 'Livechat_Routing_Method'], ...)`
- OmnichannelQueue: `settings.get('Omnichannel_queue_delay_timeout')`, `settings.get('Livechat_enabled')`

#### Auto-Translation
- All translation providers: `settings.watch('AutoTranslate_GoogleAPIKey', ...)`, etc.

#### Video Conference
- VideoConfService: `settings` used for provider configuration

#### Integrations
- Webhook processing: `settings` referenced in trigger handler and API

#### Search
- SearchProviderService: `settings` for search provider configuration

### 3. Dependency on SettingsRegistry

`SettingsRegistry` (in SettingsRegistry.ts) takes the `CachedSettings` instance as its `store` parameter (line 93):
```ts
constructor({ store, model }: { store: ICachedSettings; model: ISettingsModel }) {
    this.store = store;
    this.model = model;
}
```

All setting registration via `SettingsRegistry.add()` reads from and writes to `CachedSettings.store`. If CachedSettings breaks, no settings can be registered at startup.

### 4. Client Propagation

**`apps/meteor/server/publications/settings/index.ts`:**

The `public-settings/get` and `private-settings/get` Meteor methods serve settings to clients. While they read from the DB model, the `SettingsEvents.emit('fetch-settings', ...)` integration connects back to the CachedSettings ecosystem.

### 5. Impact Analysis

| System | Dependency Type | Impact of CachedSettings Change |
|--------|----------------|----------------------------------|
| All server modules | `settings.get()` | Complete system failure if get() breaks |
| Startup | `settings.watch()` | Modules fail to initialize reactively |
| LDAP/SAML/OAuth | `settings.get()` for auth config | Authentication completely broken |
| 2FA | `settings.get()` for 2FA settings | Security enforcement fails |
| Messaging | `settings.get()` for limits, receipts | Message processing errors |
| Notifications | `settings.get()` for notification config | Push/email/desktop notifications fail |
| Real-time | `settings.get()` in ListenersModule | Streaming behavior changes |
| Omnichannel | `settings.watchMultiple()` | Queue processing halts |
| Auto-translate | `settings.watch()` for API keys | Translation stops working |
| Admin panel | Client-side settings propagation | Admin settings UI breaks |
| SettingsRegistry | Direct store dependency | Setting registration fails at boot |
| Apps Engine | Settings used by apps | All app integrations affected |

### 6. Critical Methods by Risk

1. **`get(id)`** -- highest risk. Called thousands of times. Any performance regression or behavioral change cascades everywhere.
2. **`watch(id, cb)`** -- used for reactive initialization. Breaking the debounce, ready-wait, or callback mechanism breaks startup.
3. **`set(record)`** -- used by SettingsRegistry. Breaking it prevents setting updates from reaching the cache.
4. **`initialized()`** -- if the `'ready'` event doesn't fire, all `watch()` callbacks never execute, causing a complete startup hang.
5. **`store` (Map)** -- the underlying data structure. Any change to the Map structure breaks all reads.

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/settings/server/CachedSettings.ts` | CachedSettings class with in-memory store |
| `apps/meteor/app/settings/server/SettingsRegistry.ts` | Depends on CachedSettings as its store |
| `apps/meteor/server/publications/settings/index.ts` | Settings publication to clients |
| `apps/meteor/app/settings/server/index.ts` | Exports `settings` singleton |
| `apps/meteor/app/settings/server/cached.ts` | Alternative settings export |
| Every module using `settings.get()` | All consumers affected by changes |

### Key Symbols
- `CachedSettings` -- class providing `Map<string, ISetting>`-backed settings cache
- `ICachedSettings` -- interface with `get()`, `watch()`, `change()`, `set()`, `initialized()`
- `settings` -- singleton instance imported as `import { settings } from '../../settings/server'`
- `store: Map<string, ISetting>` -- the underlying data store
- `watch(id, cb)` -- immediate-fire + reactive subscription
- `change(id, cb)` -- future-change-only subscription
- `initialized()` -- marks cache ready, emits `'ready'`
- `Emitter` -- base class from `@rocket.chat/emitter` providing event system
