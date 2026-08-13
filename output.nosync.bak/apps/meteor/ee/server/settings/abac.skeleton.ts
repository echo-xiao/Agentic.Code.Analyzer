## File: apps/meteor/ee/server/settings/abac.ts

```typescript
import { settingsRegistry } from '../../../app/settings/server';

const abacEnabledQuery = { _id: 'ABAC_Enabled', value: true };
const virtruPdpQuery = [abacEnabledQuery, { _id: 'ABAC_PDP_Type', value: 'virtru' }];

export function addSettings(): Promise<void> {
    /* Implementation Hidden */
}

```