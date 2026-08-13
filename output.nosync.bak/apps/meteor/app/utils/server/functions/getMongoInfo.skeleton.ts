## File: apps/meteor/app/utils/server/functions/getMongoInfo.ts

```typescript
import { MongoInternals } from 'meteor/mongo';

function getOplogInfo(): { mongo: MongoConnection } {
    /* Implementation Hidden */
}

async function fallbackMongoInfo(): Promise<{
	mongoVersion: string;
	mongoStorageEngine?: string;
	mongo: MongoConnection;
}> {
    /* Implementation Hidden */
}

export async function getMongoInfo(): Promise<{
	mongoVersion: string;
	mongoStorageEngine?: string;
	mongo: MongoConnection;
}> {
    /* Implementation Hidden */
}

```