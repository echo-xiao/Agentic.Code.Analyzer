## File: apps/meteor/app/apps/server/bridges/api.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { ApiBridge } from '@rocket.chat/apps/dist/server/bridges/ApiBridge';
import type { AppApi } from '@rocket.chat/apps/dist/server/managers/AppApi';
import type { RequestMethod } from '@rocket.chat/apps-engine/definition/accessors';
import type { IApiRequest, IApiEndpoint, IApi } from '@rocket.chat/apps-engine/definition/api';
import type { Response, Request, IRouter, RequestHandler } from 'express';
import express from 'express';
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import { apiServer } from './router';
import { authenticationMiddleware } from '../../../../server/api/v1/middlewares/authentication';

WebApp.rawConnectHandlers.use(apiServer);

interface IRequestWithPrivateHash extends Request {
	_privateHash?: string;
	content?: any;
}

export class AppApisBridge extends ApiBridge {
	appRouters: Map<string, IRouter>;

	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	public async registerApi({ api, computedPath, endpoint }: AppApi, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async unregisterApis(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private _verifyApi(api: IApi, endpoint: IApiEndpoint): void {
        /* Implementation Hidden */
    }

	private _appApiExecutor(endpoint: IApiEndpoint, appId: string): RequestHandler {
        /* Implementation Hidden */
    }
}

```