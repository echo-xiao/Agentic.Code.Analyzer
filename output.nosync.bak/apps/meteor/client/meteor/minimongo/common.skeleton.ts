## File: apps/meteor/client/meteor/minimongo/common.ts

```typescript
import { getBSONType } from '@rocket.chat/mongo-adapter';

import { entriesOf } from '../../lib/objectUtils';

export const hasOwn = Object.prototype.hasOwnProperty;

const isBinary = (x: unknown): x is Uint8Array => typeof x === 'object' && x !== null && x instanceof Uint8Array;

const isArguments = (x: unknown): x is IArguments => Object.prototype.toString.call(x) === '[object Arguments]';

export const clone: <T>(v: T) => T = (v: unknown) => {
    /* Implementation Hidden */
};

export const equals = <T>(a: T, b: T): boolean => {
    /* Implementation Hidden */
};

export const isPlainObject = (x: any): x is Record<string, any> => x && getBSONType(x) === 3;

const invalidCharMsg = {
	'$': "start with '$'",
	'.': "contain '.'",
	'\0': 'contain null bytes',
};

export function assertHasValidFieldNames(doc: unknown) {
    /* Implementation Hidden */
}

function assertIsValidFieldName(key: string) {
    /* Implementation Hidden */
}

```