## File: apps/meteor/server/startup/migrations/xrun.ts

```typescript
import { Permissions, Roles, Settings, Users } from '@rocket.chat/models';
import type { UpdateResult } from 'mongodb';

import { settings } from '../../../app/settings/server';
import { upsertPermissions } from '../../lib/authorization/upsertPermissions';
import { migrateDatabase, onServerVersionChange } from '../../lib/migrations';
import { ensureCloudWorkspaceRegistered } from '../cloudRegistration';

const { MIGRATION_VERSION = 'latest' } = process.env;

const [version, ...subcommands] = MIGRATION_VERSION.split(',');

const maxAgeSettingMap = new Map([
	['RetentionPolicy_MaxAge_Channels', 'RetentionPolicy_TTL_Channels'],
	['RetentionPolicy_MaxAge_Groups', 'RetentionPolicy_TTL_Groups'],
	['RetentionPolicy_MaxAge_DMs', 'RetentionPolicy_TTL_DMs'],
]);

const moveRetentionSetting = async () => {
    /* Implementation Hidden */
};

async function setPermissionsToNewRole() {
    /* Implementation Hidden */
}

export const performMigrationProcedure = async (): Promise<void> => {
    /* Implementation Hidden */
};

```