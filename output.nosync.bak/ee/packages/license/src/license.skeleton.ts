## File: ee/packages/license/src/license.ts

```typescript
import crypto from 'node:crypto';

import type {
	ILicenseTag,
	LicenseEvents,
	ILicenseV2,
	ILicenseV3,
	LicenseLimitKind,
	BehaviorWithContext,
	LicenseBehavior,
	LicenseInfo,
	LicenseValidationOptions,
	LimitContext,
	LicenseModule,
} from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';

import { getLicenseLimit } from './deprecated';
import type { getAppsConfig, getMaxActiveUsers, getUnmodifiedLicenseAndModules } from './deprecated';
import { DuplicatedLicenseError } from './errors/DuplicatedLicenseError';
import { InvalidLicenseError } from './errors/InvalidLicenseError';
import { NotReadyForValidation } from './errors/NotReadyForValidation';
import type { onLicense } from './events/deprecated';
import { behaviorTriggered, behaviorTriggeredToggled, licenseInvalidated, licenseValidated } from './events/emitter';
import type {
	onBehaviorTriggered,
	onInvalidFeature,
	onInvalidateLicense,
	onLimitReached,
	onModule,
	onToggledFeature,
	onValidFeature,
	onValidateLicense,
} from './events/listeners';
import type { overwriteClassOnLicense } from './events/overwriteClassOnLicense';
import { logger } from './logger';
import type { getModuleDefinition, hasModule } from './modules';
import { getExternalModules, getModules, invalidateAll, replaceModules } from './modules';
import { applyPendingLicense, clearPendingLicense, hasPendingLicense, isPendingLicense, setPendingLicense } from './pendingLicense';
import type { getTags } from './tags';
import { replaceTags } from './tags';
import { decrypt } from './token';
import { convertToV3 } from './v2/convertToV3';
import { filterBehaviorsResult } from './validation/filterBehaviorsResult';
import type { setLicenseLimitCounter } from './validation/getCurrentValueForLicenseLimit';
import { getCurrentValueForLicenseLimit } from './validation/getCurrentValueForLicenseLimit';
import { getModulesToDisable } from './validation/getModulesToDisable';
import { isBehaviorsInResult } from './validation/isBehaviorsInResult';
import { isReadyForValidation } from './validation/isReadyForValidation';
import { runValidation } from './validation/runValidation';
import { validateDefaultLimits } from './validation/validateDefaultLimits';
import { validateFormat } from './validation/validateFormat';
import { validateLicenseLimits } from './validation/validateLicenseLimits';

const globalLimitKinds: LicenseLimitKind[] = ['activeUsers', 'guestUsers', 'privateApps', 'marketplaceApps', 'monthlyActiveContacts'];

// The behaviors that decide whether (and how) a license is installed. Shared between the actual
// validation performed on apply and the dry-run preview so both stay in sync if a behavior is added.
const licenseValidationBehaviors: LicenseBehavior[] = [
	'invalidate_license',
	'start_fair_policy',
	'prevent_installation',
	'disable_modules',
];

export abstract class LicenseManager extends Emitter<LicenseEvents> {
	abstract validateFormat: typeof validateFormat;

	abstract hasModule: typeof hasModule;

	abstract getModules: typeof getModules;

	abstract getModuleDefinition: typeof getModuleDefinition;

	abstract getExternalModules: typeof getExternalModules;

	abstract getTags: typeof getTags;

	abstract overwriteClassOnLicense: typeof overwriteClassOnLicense;

	abstract setLicenseLimitCounter: typeof setLicenseLimitCounter;

	abstract getCurrentValueForLicenseLimit: typeof getCurrentValueForLicenseLimit;

	abstract isLimitReached<T extends LicenseLimitKind>(action: T, context?: Partial<LimitContext<T>>): Promise<boolean>;

	abstract onValidFeature: typeof onValidFeature;

	abstract onInvalidFeature: typeof onInvalidFeature;

	abstract onToggledFeature: typeof onToggledFeature;

	abstract onModule: typeof onModule;

	abstract onValidateLicense: typeof onValidateLicense;

	abstract onInvalidateLicense: typeof onInvalidateLicense;

	abstract onLimitReached: typeof onLimitReached;

	abstract onBehaviorTriggered: typeof onBehaviorTriggered;

	// Deprecated:
	abstract onLicense: typeof onLicense;

	// Deprecated:
	abstract getMaxActiveUsers: typeof getMaxActiveUsers;

	// Deprecated:
	abstract getAppsConfig: typeof getAppsConfig;

	// Deprecated:
	abstract getUnmodifiedLicenseAndModules: typeof getUnmodifiedLicenseAndModules;

	dataCounters = new Map<LicenseLimitKind, (context?: LimitContext<LicenseLimitKind>) => Promise<number>>();

	pendingLicense = '';

	tags = new Set<ILicenseTag>();

	modules = new Set<LicenseModule>();

	private workspaceUrl: string | undefined;

	protected _license: ILicenseV3 | undefined;

	private _unmodifiedLicense: ILicenseV2 | ILicenseV3 | undefined;

	private _valid: boolean | undefined;

	protected _lockedLicense: string | undefined;

	private states = new Map<LicenseBehavior, Map<LicenseLimitKind, boolean>>();

	public get shouldPreventActionResults() {
		const state = this.states.get('prevent_action') ?? new Map<LicenseLimitKind, boolean>();

		this.states.set('prevent_action', state);

		return state;
	}

	public get license(): ILicenseV3 | undefined {
		return this._license;
	}

	public get unmodifiedLicense(): ILicenseV2 | ILicenseV3 | undefined {
		return this._unmodifiedLicense;
	}

	public get valid(): boolean | undefined {
		return this._valid;
	}

	public get encryptedLicense(): string | undefined {
		if (!this.hasValidLicense()) {
			return undefined;
		}

		return this._lockedLicense;
	}

	public async setWorkspaceUrl(url: string) {
        /* Implementation Hidden */
    }

	public getWorkspaceUrl() {
        /* Implementation Hidden */
    }

	public hashWorkspaceUrl(url: string) {
        /* Implementation Hidden */
    }

	public getHashedWorkspaceUrl() {
        /* Implementation Hidden */
    }

	public async revalidateLicense(options: Omit<LicenseValidationOptions, 'isNewLicense'> = {}): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * The sync method should be called when a license from a different instance is has changed, so the local instance
	 * needs to be updated. This method will validate the license and update the local instance if the license is valid, but will not trigger the onSync event.
	 */

	public async sync(options: Omit<LicenseValidationOptions, 'isNewLicense'> = {}): Promise<void> {
        /* Implementation Hidden */
    }

	private clearLicenseData(): void {
        /* Implementation Hidden */
    }

	private invalidateLicense(): void {
        /* Implementation Hidden */
    }

	public remove(): void {
        /* Implementation Hidden */
    }

	private async setLicenseV3(
		newLicense: ILicenseV3,
		encryptedLicense: string,
		originalLicense?: ILicenseV2 | ILicenseV3,
		isNewLicense?: boolean,
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async setLicenseV2(newLicense: ILicenseV2, encryptedLicense: string, isNewLicense?: boolean): Promise<void> {
        /* Implementation Hidden */
    }

	private isLicenseDuplicated(encryptedLicense: string): boolean {
        /* Implementation Hidden */
    }

	private async validateLicense(
		options: LicenseValidationOptions = {
			triggerSync: true,
		},
	): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Validates a license against the current workspace state without applying it.
	 *
	 * Runs the same validation pipeline used when a license is set (URL, periods and limits),
	 * but does not store the license, change validity, replace modules/tags nor emit events.
	 * It is meant to power a preview of whether a license would be accepted before committing
	 * to it from the admin UI.
	 *
	 * Returns whether the license would be accepted and, when not, the behaviors that reject it.
	 * A malformed string is reported as invalid with no reasons rather than thrown, so callers can
	 * treat every rejected license uniformly. Mirrors the apply path in throwing
	 * `NotReadyForValidation` while the workspace can't validate yet.
	 */
	public async validateLicenseForPreview(
		encryptedLicense: string,
	): Promise<{ valid: true } | { valid: false; reasons: BehaviorWithContext[] }> {
        /* Implementation Hidden */
    }

	public async setLicense(encryptedLicense: string, isNewLicense = true): Promise<boolean> {
        /* Implementation Hidden */
    }

	private triggerBehaviorEvents(validationResult: BehaviorWithContext[]): void {
        /* Implementation Hidden */
    }

	private triggerBehaviorEventsToggled(validationResult: BehaviorWithContext[]): void {
        /* Implementation Hidden */
    }

	public hasValidLicense(): boolean {
        /* Implementation Hidden */
    }

	public getLicense(): ILicenseV3 | undefined {
        /* Implementation Hidden */
    }

	public syncShouldPreventActionResults(actions: Record<LicenseLimitKind, boolean>): void {
        /* Implementation Hidden */
    }

	public async shouldPreventActionResultsMap(): Promise<{
		[key in LicenseLimitKind]: boolean;
	}> {
        /* Implementation Hidden */
    }

	public async shouldPreventAction<T extends LicenseLimitKind>(
		action: T,
		extraCount = 0,
		context: Partial<LimitContext<T>> = {},
		{ suppressLog }: Pick<LicenseValidationOptions, 'suppressLog'> = {
			suppressLog: process.env.LICENSE_VALIDATION_SUPPRESS_LOG !== 'false',
		},
	): Promise<boolean> {
        /* Implementation Hidden */
    }

	private consolidateBehaviorState<T extends LicenseLimitKind>(action: T, behavior: LicenseBehavior, triggered: boolean): boolean {
        /* Implementation Hidden */
    }

	public async getInfo({
		limits: includeLimits,
		currentValues: loadCurrentValues,
		license: includeLicense,
	}: {
		limits: boolean;
		currentValues: boolean;
		license: boolean;
	}): Promise<LicenseInfo> {
        /* Implementation Hidden */
    }
}

```