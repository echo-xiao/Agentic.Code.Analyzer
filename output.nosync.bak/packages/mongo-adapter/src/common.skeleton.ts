## File: packages/mongo-adapter/src/common.ts

```typescript
import { getBSONType } from './bson';
import { BSONType } from './types';

export function assertHasValidFieldNames(doc: unknown) {
    /* Implementation Hidden */
}

export function assertIsValidFieldName(key: string) {
    /* Implementation Hidden */
}

export const isBinary = (x: unknown): x is Uint8Array => typeof x === 'object' && x !== null && x instanceof Uint8Array;

const isArguments = (x: unknown): x is IArguments => Object.prototype.toString.call(x) === '[object Arguments]';

export const clone: <T>(v: T) => T = (v: unknown) => {
    /* Implementation Hidden */
};

export const isNumericKey = (s: string) => /^\d+$/.test(s);

export const isPlainObject = (x: unknown): x is Record<string, any> => !!x && getBSONType(x) === BSONType.Object;

export const isIndexable = (obj: unknown): obj is Record<string | number, any> => Array.isArray(obj) || isPlainObject(obj);

export const equals = <T>(a: T, b: T): boolean => {
    /* Implementation Hidden */
};

export const isEmptyArray = <T>(value: unknown): value is T[] & { length: 0 } => Array.isArray(value) && value.length === 0;

export const isTruthy = <T>(x: T | null | undefined | 0 | false | ''): x is T => Boolean(x);

```