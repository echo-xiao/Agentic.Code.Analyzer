## File: apps/meteor/server/api/v1/middlewares/authentication.ts

```typescript
import { hashLoginToken } from '@rocket.chat/account-utils';
import { Authorization } from '@rocket.chat/core-services';
import { Users } from '@rocket.chat/models';
import type { Request, Response, NextFunction } from 'express';

import { oAuth2ServerAuth } from '../../../../app/oauth2-server-config/server/oauth/oauth2-server';

type AuthenticationMiddlewareConfig = {
	rejectUnauthorized?: boolean;
	cookies?: boolean;
};

export function authenticationMiddleware(
	config: AuthenticationMiddlewareConfig = {
		rejectUnauthorized: true,
		cookies: false,
	},
) {
    /* Implementation Hidden */
}

export function hasPermissionMiddleware(
	permission: string,
	{ rejectUnauthorized } = {
		rejectUnauthorized: true,
	},
) {
    /* Implementation Hidden */
}

```