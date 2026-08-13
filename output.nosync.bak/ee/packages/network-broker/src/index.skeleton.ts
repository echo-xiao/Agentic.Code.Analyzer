## File: ee/packages/network-broker/src/index.ts

```typescript
import { isMeteorError, MeteorError } from '@rocket.chat/core-services';
import EJSON from 'ejson';
import type Moleculer from 'moleculer';
import { Errors, Serializers, ServiceBroker } from 'moleculer';
import { pino } from 'pino';

import { NetworkBroker } from './NetworkBroker';

const {
	MS_NAMESPACE = '',
	TRANSPORTER = '',
	CACHE = 'Memory',
	// SERIALIZER = 'MsgPack',
	SERIALIZER = 'EJSON',
	MOLECULER_LOG_LEVEL = 'warn',
	BALANCE_STRATEGY = 'RoundRobin',
	BALANCE_PREFER_LOCAL = 'true',
	RETRY_FACTOR = '2',
	RETRY_MAX_DELAY = '1000',
	RETRY_DELAY = '100',
	RETRY_RETRIES = '5',
	RETRY_ENABLED = 'false',
	REQUEST_TIMEOUT = '60',
	HEARTBEAT_INTERVAL = '10',
	HEARTBEAT_TIMEOUT = '30',
	BULKHEAD_ENABLED = 'false',
	BULKHEAD_CONCURRENCY = '10',
	BULKHEAD_MAX_QUEUE_SIZE = '10000',
	MS_METRICS = 'false',
	MS_METRICS_PORT = '9458',
	SKIP_PROCESS_EVENT_REGISTRATION = 'false',
} = process.env;

const { Base } = Serializers;

class CustomRegenerator extends Errors.Regenerator {
	override restoreCustomError(plainError: any): Error | undefined {
        /* Implementation Hidden */
    }

	override extractPlainError(err: Error | MeteorError): Errors.PlainMoleculerError {
        /* Implementation Hidden */
    }
}

class EJSONSerializer extends Base {
	override serialize(obj: any): Buffer {
        /* Implementation Hidden */
    }

	override deserialize(buf: Buffer): any {
        /* Implementation Hidden */
    }
}

export function startBroker(options: Moleculer.BrokerOptions = {}): NetworkBroker {
    /* Implementation Hidden */
}

```