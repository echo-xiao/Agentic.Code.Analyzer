## File: ee/packages/federation-matrix/src/api/_matrix/make-leave.ts

```typescript
import { NotAllowedError, federationSDK } from '@rocket.chat/federation-sdk';
import { Router } from '@rocket.chat/http-router';
import { Logger } from '@rocket.chat/logger';
import { ajv } from '@rocket.chat/rest-typings';

import { isAuthenticatedMiddleware } from '../middlewares/isAuthenticated';

const isMakeLeaveParamsProps = ajv.compile({
	type: 'object',
	properties: { roomId: { type: 'string' }, userId: { type: 'string' } },
	required: ['roomId', 'userId'],
});
const isMakeLeaveSuccessResponseProps = ajv.compile({
	type: 'object',
	properties: {
		event: {
			type: 'object',
			properties: {
				content: {
					type: 'object',
					properties: {
						membership: {
							type: 'string',
							const: 'leave',
						},
					},
				},
				origin: {
					type: 'string',
				},
				origin_server_ts: {
					type: 'number',
				},
				sender: {
					type: 'string',
				},
				state_key: {
					type: 'string',
				},
				type: {
					type: 'string',
					const: 'm.room.member',
				},
			},
		},
		room_version: { type: 'string' },
	},
});
const isMakeLeaveForbiddenResponseProps = ajv.compile({
	type: 'object',
	properties: { errcode: { type: 'string', const: 'M_FORBIDDEN' }, error: { type: 'string' } },
});
const isMakeLeaveErrorResponseProps = ajv.compile({
	type: 'object',
	properties: { errcode: { type: 'string', const: 'M_UNKNOWN' }, error: { type: 'string' } },
});

export const getMatrixMakeLeaveRoutes = () => {
    /* Implementation Hidden */
};

```