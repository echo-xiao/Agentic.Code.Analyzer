## File: apps/meteor/server/api/api.helpers.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';

import type { ActionThis } from './definition';
import type { DeprecationLoggerNextPlannedVersion } from '../../app/lib/server/lib/deprecationWarningLogger';
import { apiDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { hasAllPermissionAsync, hasAtLeastOnePermissionAsync } from '../lib/authorization/hasPermission';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | '*';
export type PermissionsPayload = {
	[key in RequestMethod]?: {
		operation: 'hasAll' | 'hasAny';
		permissions: string[];
	};
};

type PermissionsPayloadLight = {
	[key in RequestMethod]?: string[];
};

type PermissionsRequiredKey = string[] | PermissionsPayload | PermissionsPayloadLight;

const isLegacyPermissionsPayload = (permissionsPayload: PermissionsRequiredKey): permissionsPayload is string[] => {
    /* Implementation Hidden */
};

const isLightPermissionsPayload = (permissionsPayload: PermissionsRequiredKey): permissionsPayload is PermissionsPayloadLight => {
    /* Implementation Hidden */
};

const isPermissionsPayload = (permissionsPayload: PermissionsRequiredKey): permissionsPayload is PermissionsPayload => {
    /* Implementation Hidden */
};

export async function checkPermissionsForInvocation(
	userId: IUser['_id'],
	permissionsPayload: PermissionsPayload,
	requestMethod: RequestMethod,
): Promise<boolean> {
    /* Implementation Hidden */
}

// We'll assume options only contains permissionsRequired, as we don't care of the other elements
export function checkPermissions(options: { permissionsRequired?: PermissionsRequiredKey }) {
    /* Implementation Hidden */
}

export function parseDeprecation(
	methodThis: ActionThis<any, any, any>,
	{ alternatives, version }: { version: DeprecationLoggerNextPlannedVersion; alternatives?: string[] },
): void {
    /* Implementation Hidden */
}

```