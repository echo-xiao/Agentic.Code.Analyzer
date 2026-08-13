## File: apps/meteor/app/integrations/server/api/api.ts

```typescript
import type { IIncomingIntegration, IIntegration, IOutgoingIntegration, IUser, RequiredField } from '@rocket.chat/core-typings';
import { Integrations, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { isIntegrationsHooksAddSchema, isIntegrationsHooksRemoveSchema } from '@rocket.chat/rest-typings';
import type express from 'express';
import { Meteor } from 'meteor/meteor';
import type { RateLimiterOptionsToCheck } from 'meteor/rate-limit';
import { WebApp } from 'meteor/webapp';
import _ from 'underscore';

import { isPlainObject } from '../../../../lib/utils/isPlainObject';
import { APIClass } from '../../../../server/api/ApiClass';
import type { RateLimiterOptions } from '../../../../server/api/api';
import { API, defaultRateLimiterOptions } from '../../../../server/api/api';
import type { FailureResult, GenericRouteExecutionContext, SuccessResult, UnavailableResult } from '../../../../server/api/definition';
import type { APIActionContext } from '../../../../server/api/router';
import { loggerMiddleware } from '../../../../server/api/v1/middlewares/logger';
import { metricsMiddleware } from '../../../../server/api/v1/middlewares/metrics';
import { tracerSpanMiddleware } from '../../../../server/api/v1/middlewares/tracer';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import type { WebhookResponseItem } from '../../../../server/lib/messages/processWebhookMessage';
import { processWebhookMessage } from '../../../../server/lib/messages/processWebhookMessage';
import { metrics } from '../../../metrics/server';
import { settings } from '../../../settings/server';
import { IsolatedVMScriptEngine } from '../lib/isolated-vm/isolated-vm';
import { incomingLogger, integrationLogger } from '../logger';
import { addOutgoingIntegration } from '../methods/outgoing/addOutgoingIntegration';
import { deleteOutgoingIntegration } from '../methods/outgoing/deleteOutgoingIntegration';

const ivmEngine = new IsolatedVMScriptEngine(true);

function getEngine(_integration: IIntegration): IsolatedVMScriptEngine<true> {
    /* Implementation Hidden */
}

type IntegrationOptions = {
	event: string;
	name: string;
	target_url: string;
	data?: {
		channel_name?: string;
		trigger_words?: string[];
		username?: string;
	};
};

type IntegrationThis = GenericRouteExecutionContext & {
	request: Request & {
		integration: IIncomingIntegration;
	};
	user: RequiredField<IUser, 'username'>;
};

async function createIntegration(options: IntegrationOptions, user: IUser): Promise<IOutgoingIntegration | undefined> {
    /* Implementation Hidden */
}

async function removeIntegration(options: { target_url: string }, user: IUser): Promise<SuccessResult<void> | FailureResult<string>> {
    /* Implementation Hidden */
}

/**
 * Slack/GitHub-style webhooks send JSON wrapped in a `payload` field
 * with Content-Type: application/x-www-form-urlencoded (e.g. `payload={"text":"hello"}`).
 * This function unwraps it so integrations receive the parsed JSON directly.
 */
function getBodyParams(bodyParams: unknown, request: Request): Record<string, unknown> {
    /* Implementation Hidden */
}

async function executeIntegrationRest(
	this: IntegrationThis,
): Promise<
	| SuccessResult<Record<string, string> | { responses: WebhookResponseItem[] } | undefined | void>
	| FailureResult<string>
	| FailureResult<{ responses: WebhookResponseItem[] }>
	| UnavailableResult<string>
> {
    /* Implementation Hidden */
}

type IntegrationSampleBody = {
	token: string;
	channel_id: string;
	channel_name: string;
	timestamp: Date;
	user_id: string;
	user_name: string;
	text: string;
	trigger_word: string;
};

function integrationSampleRest(): { statusCode: number; body: IntegrationSampleBody[] } {
    /* Implementation Hidden */
}

function integrationInfoRest(): { statusCode: number; body: { success: boolean } } {
    /* Implementation Hidden */
}

class WebHookAPI extends APIClass<'/hooks'> {
	override async authenticatedRoute(routeContext: APIActionContext): Promise<IUser | null> {
        /* Implementation Hidden */
    }

	override shouldAddRateLimitToRoute(options: { rateLimiterOptions?: RateLimiterOptions | boolean }): boolean {
        /* Implementation Hidden */
    }

	override async shouldVerifyRateLimit(): Promise<boolean> {
        /* Implementation Hidden */
    }

	override async enforceRateLimit(
		objectForRateLimitMatch: RateLimiterOptionsToCheck,
		request: Request,
		response: Response,
		userId: string,
	): Promise<void> {
        /* Implementation Hidden */
    }
}

const Api = new WebHookAPI({
	enableCors: true,
	apiPath: 'hooks/',
	useDefaultAuth: false,
	prettyJson: process.env.NODE_ENV === 'development',
});

Api.router
	.use(
		metricsMiddleware({
			basePathRegex: new RegExp(/^\/hooks\//),
			api: Api,
			settings,
			endpointTimeSummary: metrics.rocketchatRestApi,
			endpointTimeHistogram: metrics.rocketchatRestApiSeconds,
			responseSizeHistogram: metrics.rocketchatRestApiResponseSizeBytes,
			activeRequestsGauge: metrics.rocketchatRestApiActiveRequests,
		}),
	)
	.use(tracerSpanMiddleware)
	.use(loggerMiddleware(integrationLogger));

Api.addRoute(
	':integrationId/:userId/:token',
	{ authRequired: true },
	{
		post: executeIntegrationRest,
		get: executeIntegrationRest,
	},
);

Api.addRoute(
	':integrationId/:token',
	{ authRequired: true },
	{
		post: executeIntegrationRest,
		get: executeIntegrationRest,
	},
);

Api.addRoute(
	'sample/:integrationId/:userId/:token',
	{ authRequired: true },
	{
		get: integrationSampleRest,
	},
);

Api.addRoute(
	'sample/:integrationId/:token',
	{ authRequired: true },
	{
		get: integrationSampleRest,
	},
);

Api.addRoute(
	'info/:integrationId/:userId/:token',
	{ authRequired: true },
	{
		get: integrationInfoRest,
	},
);

Api.addRoute(
	'info/:integrationId/:token',
	{ authRequired: true },
	{
		get: integrationInfoRest,
	},
);

Api.addRoute(
	'add/:integrationId/:userId/:token',
	{ authRequired: true, validateParams: isIntegrationsHooksAddSchema },
	{
		async post() {
			const result = await createIntegration(this.bodyParams, this.user);

			return API.v1.success(result || {});
		},
	},
);

Api.addRoute(
	'add/:integrationId/:token',
	{ authRequired: true, validateParams: isIntegrationsHooksAddSchema },
	{
		async post() {
			const result = await createIntegration(this.bodyParams, this.user);

			return API.v1.success(result || {});
		},
	},
);

Api.addRoute(
	'remove/:integrationId/:userId/:token',
	{ authRequired: true, validateParams: isIntegrationsHooksRemoveSchema },
	{
		async post() {
			const result = await removeIntegration(this.bodyParams, this.user);

			return API.v1.success(result || {});
		},
	},
);

Api.addRoute(
	'remove/:integrationId/:token',
	{ authRequired: true, validateParams: isIntegrationsHooksRemoveSchema },
	{
		async post() {
			const result = await removeIntegration(this.bodyParams, this.user);

			return API.v1.success(result || {});
		},
	},
);

Meteor.startup(() => {
	(WebApp.rawConnectHandlers as unknown as ReturnType<typeof express>).use(Api.router.router);
});

```