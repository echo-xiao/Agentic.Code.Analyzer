## File: ee/packages/abac/src/test-helpers/mongoMemoryServer.ts

```typescript
import { registerModel, UsersRaw, RoomsRaw, AbacAttributesRaw, ServerEventsRaw, SubscriptionsRaw } from '@rocket.chat/models';
import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const SHARED_ABAC_TEST_DB = 'abac_test';

type SharedState = {
	mongo: MongoMemoryServer;
	client: MongoClient;
	refCount: number;
};

let sharedState: SharedState | null = null;
let initialization: Promise<SharedState> | null = null;

const ensureState = async (): Promise<SharedState> => {
    /* Implementation Hidden */
};

const dropDatabase = async (db: Db) => {
    /* Implementation Hidden */
};

export type SharedMongoConnection = {
	mongo: MongoMemoryServer;
	client: MongoClient;
	db: Db;
	cleanupDatabase: () => Promise<void>;
	release: () => Promise<void>;
};

const registerAbacTestModels = (db: Db) => {
    /* Implementation Hidden */
};

export const acquireSharedInMemoryMongo = async (dbName: string): Promise<SharedMongoConnection> => {
    /* Implementation Hidden */
};

```