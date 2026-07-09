# How does enterprise feature gating work?

## Answer

Enterprise feature gating in Rocket.Chat is built around the `LicenseManager` abstract class, its concrete implementation `LicenseImp`, a module-based feature toggle system, and event listeners for license state changes. The license is validated against workspace URL, expiry, and limits, with modules being enabled/disabled accordingly.

### 1. LicenseManager (Abstract Base)

**`ee/packages/license/src/license.ts`, line 55:**
```ts
export abstract class LicenseManager extends Emitter<LicenseEvents> {
    abstract hasModule: typeof hasModule;
    abstract validateFormat: typeof validateFormat;
    abstract getModules: typeof getModules;
    abstract onValidateLicense: typeof onValidateLicense;
    abstract onInvalidateLicense: typeof onInvalidateLicense;
    abstract onToggledFeature: typeof onToggledFeature;
    abstract onModule: typeof onModule;
    abstract onValidFeature: typeof onValidFeature;
    abstract onInvalidFeature: typeof onInvalidFeature;
    abstract onLimitReached: typeof onLimitReached;
    abstract onBehaviorTriggered: typeof onBehaviorTriggered;
    // ...
```

Key internal state:
- `_license: ILicenseV3 | undefined` (line 114) -- the current parsed license
- `_valid: boolean | undefined` (line 118) -- whether license is currently valid
- `_lockedLicense: string | undefined` (line 120) -- encrypted license string
- `modules = new Set<LicenseModule>()` (line 110) -- currently enabled modules
- `tags = new Set<ILicenseTag>()` (line 108) -- license tags
- `dataCounters = new Map<LicenseLimitKind, ...>()` (line 104) -- limit counters
- `states = new Map<LicenseBehavior, Map<LicenseLimitKind, boolean>>()` (line 122) -- behavior states

Key methods:
- `setLicense(encryptedLicense)` (line 315) -- decrypts, validates format, sets license via `setLicenseV3()`
- `validateLicense(options)` (line 256) -- runs `runValidation()`, checks for invalidation behaviors, enables/disables modules via `replaceModules()`
- `revalidateLicense()` (line 164) -- re-validates existing license
- `hasValidLicense()` -- checks `this._valid`
- `invalidateLicense()` (line 208) -- sets `_valid = false`, calls `invalidateAll()`, emits `licenseInvalidated`
- `remove()` (line 215) -- clears license data entirely

### 2. LicenseImp (Concrete Implementation)

**`ee/packages/license/src/licenseImp.ts`, line 30:**
```ts
export class LicenseImp extends LicenseManager {
    constructor() {
        super();
        this.onValidateLicense(() => showLicense.call(this, ...));
        this.onValidateLicense(() => { logger.startup({ msg: 'License installed', ... }); });
        this.onInvalidateLicense(() => { logger.startup({ msg: 'License invalidated' }); });
    }

    validateFormat = validateFormat;
    hasModule = hasModule;       // line 58
    getModules = getModules;     // line 60
    getModuleDefinition = getModuleDefinition;
    getExternalModules = getExternalModules;
    getTags = getTags;
    overwriteClassOnLicense = overwriteClassOnLicense;
    setLicenseLimitCounter = setLicenseLimitCounter;
    getCurrentValueForLicenseLimit = getCurrentValueForLicenseLimit;
    onChange = onChange;
    onInstall = onInstall;
```

`hasModule()` (from `ee/packages/license/src/modules.ts`) checks if a module name exists in the `this.modules` Set.

`isLimitReached()` (line 74) delegates to `this.shouldPreventAction(action, 0, context)`.

### 3. License Validation Flow

When `setLicense()` is called (line 315 in license.ts):
1. `validateFormat(encryptedLicense)` -- checks license string format
2. `decrypt(encryptedLicense)` -- decrypts to get license JSON
3. `setLicenseV3()` or `setLicenseV2()` (auto-converts v2 to v3 via `convertToV3()`)
4. `validateLicense()` runs `runValidation()` with behaviors: `['invalidate_license', 'start_fair_policy', 'prevent_installation', 'disable_modules']`
5. If behaviors include `invalidate_license` or `prevent_installation`, throws `InvalidLicenseError`
6. Computes `modulesToDisable` from validation result via `getModulesToDisable()`
7. Enables remaining modules via `replaceModules()` -- returns whether modules changed
8. Calls `licenseValidated()` which emits events to all listeners

### 4. Event Listeners

**`ee/packages/license/src/events/listeners.ts`:**

Event registration functions (bound to `LicenseImp` instance):
- `onValidateLicense(cb)` -- fires when license is validated successfully
- `onInvalidateLicense(cb)` -- fires when license becomes invalid
- `onModule(module, cb)` -- fires when a specific module is enabled
- `onToggledFeature(module, { up: cb, down: cb })` -- fires when a module is toggled on/off
- `onValidFeature(module, cb)` -- fires when a feature becomes valid
- `onInvalidFeature(module, cb)` -- fires when a feature becomes invalid
- `onLimitReached(limit, cb)` -- fires when a limit (activeUsers, etc.) is reached
- `onBehaviorTriggered(behavior, cb)` -- fires when a behavior is triggered

### 5. Module-Based Feature Gating

**`ee/packages/license/src/modules.ts`:**

- `hasModule(module)` -- checks `this.modules.has(module)` on the LicenseManager instance
- `replaceModules(newModules)` -- diffs current vs new modules, emits `'module'` events for changes
- `invalidateAll()` -- clears all modules

Modules are strings like `'auditing'`, `'canned-responses'`, `'engagement-dashboard'`, `'livechat-enterprise'`, etc., defined in `LicenseModule` type from `@rocket.chat/core-typings`.

### 6. Limit-Based Gating

The `shouldPreventAction(action, extraCount, context)` method on `LicenseManager` checks resource limits:
- `activeUsers` -- max active users
- `guestUsers` -- max guest users
- `privateApps` -- max private marketplace apps
- `marketplaceApps` -- max marketplace apps
- `monthlyActiveContacts` -- MAC limit for omnichannel

### 7. Usage in Application Code

Throughout the codebase, feature gating is used via:
```ts
import { License } from '@rocket.chat/license';

// Check module
if (await License.hasModule('auditing')) { ... }

// React to feature toggle
License.onToggledFeature('canned-responses', {
    up: () => { /* enable feature */ },
    down: () => { /* disable feature */ },
});

// Check limits
if (await License.shouldPreventAction('monthlyActiveContacts')) { ... }
```

### Key Files
| File | Role |
|------|------|
| `ee/packages/license/src/license.ts` | `LicenseManager` abstract class with validation logic |
| `ee/packages/license/src/licenseImp.ts` | `LicenseImp` concrete implementation binding all methods |
| `ee/packages/license/src/modules.ts` | Module set management: `hasModule()`, `replaceModules()`, `invalidateAll()` |
| `ee/packages/license/src/events/listeners.ts` | Event listener registration functions |
| `ee/packages/license/src/events/emitter.ts` | Event emission: `licenseValidated()`, `licenseInvalidated()`, `behaviorTriggered()` |
| `ee/packages/license/src/validation/runValidation.ts` | Core validation logic against license constraints |
| `ee/packages/license/src/validation/validateFormat.ts` | License format validation |
| `ee/packages/license/src/token.ts` | License decryption |
| `ee/packages/license/src/v2/convertToV3.ts` | V2 to V3 license format conversion |

### Key Symbols
- `LicenseManager` -- abstract class extending `Emitter<LicenseEvents>`, holds license state
- `LicenseImp` -- concrete class binding `hasModule`, `validateFormat`, etc.
- `hasModule(module)` -- checks if module is in the enabled set
- `onToggledFeature(module, { up, down })` -- registers callbacks for feature enable/disable
- `onValidateLicense(cb)` / `onInvalidateLicense(cb)` -- license state change listeners
- `shouldPreventAction(action, count, context)` -- limit-based action prevention
- `replaceModules(modules)` -- updates the active module set, emits change events
- `runValidation()` -- core validation against license expiry, URL, limits
