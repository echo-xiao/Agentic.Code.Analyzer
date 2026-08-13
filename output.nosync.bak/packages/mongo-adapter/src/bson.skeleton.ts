## File: packages/mongo-adapter/src/bson.ts

```typescript
import { BSONType } from './types';

export const getBSONType = <T>(v: T): BSONType => {
    /* Implementation Hidden */
};

const getBSONTypeOrder = (type: BSONType): number => {
    /* Implementation Hidden */
};

type ObjectID = {
	toHexString(): string;
	equals(otherID: ObjectID): boolean;
};

export const compareBSONValues = (a: unknown, b: unknown): number => {
    /* Implementation Hidden */
};

```