## File: apps/meteor/app/meteor-accounts-saml/server/listener.ts

```typescript
import type { IncomingMessage, ServerResponse } from 'node:http';

import bodyParser from 'body-parser';
import express from 'express';
import { Meteor } from 'meteor/meteor';
import { RoutePolicy } from 'meteor/routepolicy';
import { WebApp } from 'meteor/webapp';

import type { ISAMLAction } from './definition/ISAMLAction';
import { SAML } from './lib/SAML';
import { SAMLUtils } from './lib/Utils';
import { SystemLogger } from '../../../server/lib/logger/system';

RoutePolicy.declare('/_saml/', 'network');

const samlUrlToObject = function (url: string | undefined): ISAMLAction | null {
    /* Implementation Hidden */
};

const middleware = async function (req: express.Request, res: ServerResponse, next: (err?: any) => void): Promise<void> {
    /* Implementation Hidden */
};

// Listen to incoming SAML http requests
WebApp.connectHandlers.use(
	/^\/_saml/,
	bodyParser.json(),
	express.urlencoded({
		extended: true,
		limit: '50mb',
	}),
	async (req: IncomingMessage, res: ServerResponse, next: (err?: any) => void) => middleware(req as express.Request, res, next),
);

```