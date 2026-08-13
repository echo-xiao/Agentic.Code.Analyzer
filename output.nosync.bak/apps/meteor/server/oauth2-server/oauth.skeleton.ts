## File: apps/meteor/server/oauth2-server/oauth.ts

```typescript
import OAuthServer, { OAuthError, UnauthorizedRequestError } from '@node-oauth/oauth2-server';
import { OAuthApps, Users } from '@rocket.chat/models';
import express from 'express';
import type { Express, NextFunction, Request, Response } from 'express';
import { Accounts } from 'meteor/accounts-base';

import type { ModelConfig } from './model';
import { Model } from './model';

export class OAuth2Server {
	public app: Express;

	private oauth: OAuthServer;

	private config: ModelConfig;

	constructor(config: ModelConfig) {
        /* Implementation Hidden */
    }

	initRoutes() {
        /* Implementation Hidden */
    }
}

```