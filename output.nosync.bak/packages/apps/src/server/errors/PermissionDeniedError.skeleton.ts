## File: packages/apps/src/server/errors/PermissionDeniedError.ts

```typescript
import type { IPermission } from '@rocket.chat/apps-engine/definition/permissions/IPermission';

interface IPermissionDeniedErrorParams {
	appId: string;
	missingPermissions: Array<IPermission>;
	methodName?: string;
	reason?: string;
	message?: string;
}

export class PermissionDeniedError extends Error {
	constructor({ appId, missingPermissions, methodName, reason, message }: IPermissionDeniedErrorParams) {
        /* Implementation Hidden */
    }
}

```