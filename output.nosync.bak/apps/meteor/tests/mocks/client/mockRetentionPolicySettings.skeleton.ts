## File: apps/meteor/tests/mocks/client/mockRetentionPolicySettings.ts

```typescript
import { mockAppRoot } from '@rocket.chat/mock-providers';

export const createRenteionPolicySettingsMock = ({
	enabled = true,
	filesOnly = false,
	doNotPrunePinned = false,
	appliesToChannels = false,
	TTLChannels = 60000,
	appliesToGroups = false,
	TTLGroups = 60000,
	appliesToDMs = false,
	TTLDMs = 60000,
	precision = '0',
	advancedPrecision = false,
	advancedPrecisionCron = '*/30 * * * *',
} = {}) => {
    /* Implementation Hidden */
};

```