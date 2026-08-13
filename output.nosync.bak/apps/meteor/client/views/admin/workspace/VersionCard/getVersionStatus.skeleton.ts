## File: apps/meteor/client/views/admin/workspace/VersionCard/getVersionStatus.ts

```typescript
import type { SupportedVersions } from '@rocket.chat/server-cloud-communication';
import semver from 'semver';

import type { VersionStatus } from './components/VersionTag';

export const getVersionStatus = (
	serverVersion: string,
	versions: SupportedVersions['versions'],
): { label: VersionStatus; expiration: Date | undefined; version: string } => {
    /* Implementation Hidden */
};

```