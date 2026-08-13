## File: ee/packages/license/src/events/listeners.ts

```typescript
import type { LicenseLimitKind, LicenseModule, BehaviorWithContext, LicenseBehavior } from '@rocket.chat/core-typings';

import type { LicenseManager } from '../license';
import { hasModule } from '../modules';

/**
 * Invoked when the license changes some internal state. it's called to sync the license with other instances.
 */
export function onChange(this: LicenseManager, cb: () => void) {
    /* Implementation Hidden */
}

export function onInstall(this: LicenseManager, cb: () => void) {
    /* Implementation Hidden */
}

export function onRemoveLicense(this: LicenseManager, cb: () => void) {
    /* Implementation Hidden */
}

export function onInvalidate(this: LicenseManager, cb: () => void) {
    /* Implementation Hidden */
}

export function onValidFeature(this: LicenseManager, feature: LicenseModule, cb: () => void) {
    /* Implementation Hidden */
}

export function onInvalidFeature(this: LicenseManager, feature: LicenseModule, cb: () => void) {
    /* Implementation Hidden */
}

export function onToggledFeature(
	this: LicenseManager,
	feature: LicenseModule,
	{ up, down }: { up?: () => Promise<void> | void; down?: () => Promise<void> | void },
): () => void {
    /* Implementation Hidden */
}

export function onModule(this: LicenseManager, cb: (data: { module: LicenseModule; external: boolean; valid: boolean }) => void) {
    /* Implementation Hidden */
}

export function onValidateLicense(this: LicenseManager, cb: () => void) {
    /* Implementation Hidden */
}

export function onInvalidateLicense(this: LicenseManager, cb: () => void) {
    /* Implementation Hidden */
}

export function onBehaviorTriggered(
	this: LicenseManager,
	behavior: Exclude<LicenseBehavior, 'prevent_installation'>,
	cb: (data: { reason: BehaviorWithContext['reason']; limit?: LicenseLimitKind }) => void,
) {
    /* Implementation Hidden */
}

export function onBehaviorToggled(
	this: LicenseManager,
	behavior: Exclude<LicenseBehavior, 'prevent_installation'>,
	cb: (data: { reason: BehaviorWithContext['reason']; limit?: LicenseLimitKind }) => void,
) {
    /* Implementation Hidden */
}

export function onLimitReached(this: LicenseManager, limitKind: LicenseLimitKind, cb: () => void) {
    /* Implementation Hidden */
}

```