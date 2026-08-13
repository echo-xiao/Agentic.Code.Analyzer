## File: apps/meteor/server/api/lib/getServerInfo.ts

```typescript
import type { IWorkspaceInfo } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';

import { getTrimmedServerVersion } from './getTrimmedServerVersion';
import { settings } from '../../../app/settings/server';
import { Info, minimumClientVersions } from '../../../app/utils/rocketchat.info';
import { hasPermissionAsync } from '../../lib/authorization/hasPermission';
import { getCachedSupportedVersionsToken, wrapPromise } from '../../lib/cloud/supportedVersionsToken/supportedVersionsToken';

export async function getServerInfo(userId?: string): Promise<IWorkspaceInfo> {
    /* Implementation Hidden */
}

```