## File: ee/packages/federation-matrix/src/api/_matrix/transactions.ts

```typescript
import type { EventID } from '@rocket.chat/federation-sdk';
import { federationSDK } from '@rocket.chat/federation-sdk';
import { Router } from '@rocket.chat/http-router';
import { ajv, ajvQuery } from '@rocket.chat/rest-typings';

import { canAccessResourceMiddleware } from '../middlewares/canAccessResource';
import { isAuthenticatedMiddleware } from '../middlewares/isAuthenticated';

const SendTransactionParamsSchema = {
	type: 'object',
	properties: {
		txnId: {
			type: 'string',
			description: 'Transaction ID',
		},
	},
	required: ['txnId'],
};

const isSendTransactionParamsProps = ajv.compile(SendTransactionParamsSchema);

const GetEventParamsSchema = {
	type: 'object',
	properties: {
		eventId: {
			type: 'string',
			description: 'Event ID',
		},
	},
	required: ['eventId'],
	additionalProperties: false,
};

const isGetEventParamsProps = ajv.compile(GetEventParamsSchema);

const GetEventResponseSchema = {
	type: 'object',
	properties: {
		origin_server_ts: {
			type: 'number',
			minimum: 0,
			description: 'Unix timestamp in milliseconds',
		},
		origin: {
			type: 'string',
			description: 'Origin server',
		},
		pdus: {
			type: 'array',
			items: {
				type: 'object',
			},
			description: 'Persistent data units (PDUs)',
		},
	},
	required: ['origin_server_ts', 'origin', 'pdus'],
};

const isGetEventResponseProps = ajv.compile(GetEventResponseSchema);

const EventHashSchema = {
	type: 'object',
	properties: {
		sha256: {
			type: 'string',
			description: 'SHA256 hash of the event',
		},
	},
	required: ['sha256'],
};

const EventSignatureSchema = {
	type: 'object',
	description: 'Event signatures by server and key ID',
};

const EventBaseSchema = {
	type: 'object',
	properties: {
		type: {
			type: 'string',
			description: 'Event type',
		},
		content: {
			type: 'object',
			description: 'Event content',
		},
		sender: {
			type: 'string',
			pattern: '^@[A-Za-z0-9_=\\/.+-]+:(.+)$',
			description: 'Matrix user ID in format @user:server.com',
		},
		room_id: {
			type: 'string',
			pattern: '^![A-Za-z0-9_=\\/.+-]+:(.+)$',
			description: 'Matrix room ID in format !room:server.com',
		},
		origin_server_ts: {
			type: 'number',
			minimum: 0,
			description: 'Unix timestamp in milliseconds',
		},
		depth: {
			type: 'number',
			minimum: 0,
			description: 'Event depth',
		},
		prev_events: {
			type: 'array',
			items: {
				type: 'string',
			},
			description: 'Previous events in the room',
		},
		auth_events: {
			type: 'array',
			items: {
				type: 'string',
			},
			description: 'Authorization events',
		},
		origin: {
			type: 'string',
			description: 'Origin server',
		},
		hashes: {
			...EventHashSchema,
			nullable: true,
		},
		signatures: {
			...EventSignatureSchema,
			nullable: true,
		},
		unsigned: {
			type: 'object',
			description: 'Unsigned data',
			nullable: true,
		},
	},
	required: ['type', 'content', 'sender', 'room_id', 'origin_server_ts', 'depth', 'prev_events', 'auth_events'],
};

const SendTransactionBodySchema = {
	type: 'object',
	properties: {
		origin: {
			type: 'string',
			description: 'Origin server',
		},
		origin_server_ts: {
			type: 'number',
			minimum: 0,
			description: 'Unix timestamp in milliseconds',
		},
		pdus: {
			type: 'array',
			items: EventBaseSchema,
			description: 'Persistent data units (PDUs) to process',
			default: [],
		},
		edus: {
			type: 'array',
			items: {
				type: 'object',
				additionalProperties: true,
			},
			description: 'Ephemeral data units (EDUs)',
			default: [],
			nullable: true,
		},
	},
	required: ['origin', 'origin_server_ts', 'pdus'],
};

const isSendTransactionBodyProps = ajv.compile(SendTransactionBodySchema);

const SendTransactionResponseSchema = {
	type: 'object',
	properties: {
		pdus: {
			type: 'object',
			description: 'Processing results for each PDU',
		},
		edus: {
			type: 'object',
			description: 'Processing results for each EDU',
		},
	},
	required: ['pdus', 'edus'],
};

const isSendTransactionResponseProps = ajv.compile(SendTransactionResponseSchema);

const ErrorResponseSchema = {
	type: 'object',
	properties: {
		error: {
			type: 'string',
		},
		details: {
			type: 'object',
		},
	},
	required: ['error', 'details'],
};

const isErrorResponseProps = ajv.compile(ErrorResponseSchema);

const GetStateIdsParamsSchema = {
	type: 'object',
	properties: {
		event_id: {
			type: 'string',
		},
	},
	required: ['event_id'],
};

const isGetStateIdsParamsProps = ajv.compile(GetStateIdsParamsSchema);

const GetStateIdsResponseSchema = {
	type: 'object',
	properties: {
		stateIds: {
			type: 'array',
			items: {
				type: 'string',
			},
		},
	},
};

const isGetStateIdsResponseProps = ajv.compile(GetStateIdsResponseSchema);
const GetStateParamsSchema = {
	type: 'object',
	properties: {
		event_id: {
			type: 'string',
		},
	},
};
const isGetStateParamsProps = ajv.compile<{
	event_id: string;
}>(GetStateParamsSchema);

const GetStateResponseSchema = {
	type: 'object',
	properties: {
		state: {
			type: 'object',
		},
	},
};

const isGetStateResponseProps = ajv.compile(GetStateResponseSchema);

const BackfillParamsSchema = {
	type: 'object',
	properties: {
		roomId: {
			type: 'string',
			pattern: '^![A-Za-z0-9_=\\/.+-]+:(.+)$',
			description: 'Matrix room ID',
		},
	},
	required: ['roomId'],
	additionalProperties: false,
};

const isBackfillParamsProps = ajv.compile(BackfillParamsSchema);

const BackfillQuerySchema = {
	type: 'object',
	properties: {
		limit: {
			type: 'number',
			minimum: 1,
			maximum: 100,
			description: 'Maximum number of events to retrieve',
		},
		v: {
			oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
			description: 'Event ID(s) to backfill from',
		},
	},
	required: ['limit', 'v'],
	additionalProperties: false,
};

const isBackfillQueryProps = ajvQuery.compile<{
	limit: number;
	v: string | string[];
}>(BackfillQuerySchema);

const BackfillResponseSchema = {
	type: 'object',
	properties: {
		origin: {
			type: 'string',
			description: 'Origin server',
		},
		origin_server_ts: {
			type: 'number',
			minimum: 0,
			description: 'Unix timestamp in milliseconds',
		},
		pdus: {
			type: 'array',
			items: EventBaseSchema,
			description: 'Events in reverse chronological order',
		},
	},
	required: ['origin', 'origin_server_ts', 'pdus'],
};

const isBackfillResponseProps = ajv.compile(BackfillResponseSchema);

export const getMatrixTransactionsRoutes = () => {
    /* Implementation Hidden */
};

```