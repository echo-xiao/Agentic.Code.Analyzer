## File: apps/meteor/server/lib/settingsRegenerator.ts

```typescript
// Validates settings on DB are correct on structure
// And deletes invalid ones
import { Logger } from '@rocket.chat/logger';
import { Settings } from '@rocket.chat/models';

// Validates settings on DB are correct on structure by matching the ones missing all the required fields
const logger = new Logger('SettingsRegenerator');
export async function settingsRegenerator() {
    /* Implementation Hidden */
}

```