## File: apps/meteor/app/integrations/server/lib/mountQueriesBasedOnPermission.ts

```typescript
import type { DeepWritable } from '@rocket.chat/core-typings';
import { Meteor } from 'meteor/meteor';
import type { Filter } from 'mongodb';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';

export const mountIntegrationQueryBasedOnPermissions = async (userId: string) => {
    /* Implementation Hidden */
};

export const mountIntegrationHistoryQueryBasedOnPermissions = async (userId: string, integrationId: string) => {
    /* Implementation Hidden */
};

```