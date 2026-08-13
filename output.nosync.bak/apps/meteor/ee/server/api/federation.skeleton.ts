## File: apps/meteor/ee/server/api/federation.ts

```typescript
import { FederationMatrix } from '@rocket.chat/core-services';
import { getFederationRoutes } from '@rocket.chat/federation-matrix';
import { Logger } from '@rocket.chat/logger';
import { ajv, ajvQuery } from '@rocket.chat/rest-typings';
import type express from 'express';
import { WebApp } from 'meteor/webapp';

import { API } from '../../../server/api';
import { getTrimmedServerVersion } from '../../../server/api/lib/getTrimmedServerVersion';

const logger = new Logger('FederationRoutes');

API.v1.get(
	'/federation/matrixIds.verify',
	{
		authRequired: true,
		query: ajvQuery.compile<{
			matrixIds: string[];
		}>({
			type: 'object',
			properties: {
				matrixIds: { type: 'array', items: { type: 'string' } },
			},
		}),
		response: {
			200: ajv.compile<{
				results: { [key: string]: string };
			}>({
				type: 'object',
				properties: {
					results: { type: 'object', additionalProperties: { type: 'string' } },
				},
			}),
		},
	},
	async function () {
		const { matrixIds } = this.queryParams;
		return API.v1.success({
			results: await FederationMatrix.verifyMatrixIds(matrixIds),
		});
	},
);

export async function registerFederationRoutes(): Promise<void> {
    /* Implementation Hidden */
}

```