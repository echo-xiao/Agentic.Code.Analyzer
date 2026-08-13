## File: packages/core-services/src/lib/mongo.ts

```typescript
import { isTracingEnabled } from '@rocket.chat/tracing';
import { MongoClient } from 'mongodb';
import type { Db, Collection, MongoClientOptions, Document } from 'mongodb';

const { MONGO_URL = 'mongodb://localhost:27017/rocketchat' } = process.env;

const name = /^mongodb:\/\/.*?(?::[0-9]+)?\/([^?]*)/.exec(MONGO_URL)?.[1];

function connectDb(options?: MongoClientOptions): Promise<MongoClient> {
    /* Implementation Hidden */
}

let db: Db;

export const getConnection = ((): ((options?: MongoClientOptions) => Promise<{ db: Db; client: MongoClient }>) => {
	let client: MongoClient;

	return async (options): Promise<{ db: Db; client: MongoClient }> => {
		if (db) {
			return { db, client };
		}
		if (client == null) {
			client = await connectDb(options);
			db = client.db(name);
		}

		// if getConnection was called multiple times before it was connected, wait for the connection
		return { client, db: client.db(name) };
	};
})();

export async function getTrashCollection<T extends Document>(): Promise<Collection<T>> {
    /* Implementation Hidden */
}

```