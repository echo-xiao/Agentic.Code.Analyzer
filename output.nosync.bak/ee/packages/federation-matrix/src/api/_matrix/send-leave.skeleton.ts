## File: ee/packages/federation-matrix/src/api/_matrix/send-leave.ts

```typescript
import { NotAllowedError, federationSDK } from '@rocket.chat/federation-sdk';
import { Router } from '@rocket.chat/http-router';
import { Logger } from '@rocket.chat/logger';
import { ajv } from '@rocket.chat/rest-typings';

import { isAuthenticatedMiddleware } from '../middlewares/isAuthenticated';

const isSendLeaveParamsProps = ajv.compile({
	type: 'object',
	properties: { roomId: { type: 'string' }, eventId: { type: 'string' } },
	required: ['roomId', 'eventId'],
});
const isSendLeaveBodyProps = ajv.compile({
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
		depth: {
			type: 'number',
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
	required: ['content', 'depth', 'origin', 'origin_server_ts', 'sender', 'state_key', 'type'],
});
const isSendLeaveSuccessResponseProps = ajv.compile({
	type: 'object',
	properties: {},
});
const isSendLeaveForbiddenResponseProps = ajv.compile({
	type: 'object',
	properties: { errcode: { type: 'string', const: 'M_FORBIDDEN' }, error: { type: 'string' } },
});
const isSendLeaveErrorResponseProps = ajv.compile({
	type: 'object',
	properties: { errcode: { type: 'string', const: 'M_UNKNOWN' }, error: { type: 'string' } },
});

export const getMatrixSendLeaveRoutes = () => {
    /* Implementation Hidden */
};

```