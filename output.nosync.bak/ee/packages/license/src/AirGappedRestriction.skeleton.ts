## File: ee/packages/license/src/AirGappedRestriction.ts

```typescript
import EventEmitter from 'node:events';

import { License } from '.';
import { decryptStatsToken } from './token';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const NO_ACTION_PERIOD_IN_DAYS = 3;
const WARNING_PERIOD_IN_DAYS = 7;

class AirGappedRestrictionClass extends EventEmitter {
	#restricted = true;

	public get restricted(): boolean {
		return this.#restricted;
	}

	public async computeRestriction(encryptedToken?: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async checkRemainingDaysSinceLastStatsReport(encryptedToken: string): Promise<void> {
        /* Implementation Hidden */
    }

	private applyRestrictions(): void {
        /* Implementation Hidden */
    }

	private removeRestrictionsUnderLicense(): void {
        /* Implementation Hidden */
    }

	public isWarningPeriod(days: number) {
        /* Implementation Hidden */
    }

	private notifyRemainingDaysUntilRestriction(daysSinceLastStatsReport: number): void {
        /* Implementation Hidden */
    }
}

const airGappedRestriction = new AirGappedRestrictionClass();

export { airGappedRestriction as AirGappedRestriction };

```