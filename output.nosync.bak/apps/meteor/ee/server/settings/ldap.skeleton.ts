## File: apps/meteor/ee/server/settings/ldap.ts

```typescript
import { settingsRegistry } from '../../../app/settings/server';

export const ldapIntervalValuesToCronMap: Record<string, string> = {
	every_1_hour: '0 * * * *',
	every_6_hours: '0 */6 * * *',
	every_12_hours: '0 */12 * * *',
	every_24_hours: '0 0 * * *',
	every_48_hours: '0 0 */2 * *',
};

export function addSettings(): Promise<void> {
    /* Implementation Hidden */
}

```