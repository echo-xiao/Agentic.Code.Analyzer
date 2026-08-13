## File: packages/base64/src/base64.ts

```typescript
// Base 64 encoding

const BASE_64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const BASE_64_VALS = Object.create(null);

const getChar = (val: number) => BASE_64_CHARS.charAt(val);
const getVal = (ch: string) => (ch === '=' ? -1 : BASE_64_VALS[ch]);

for (let i = 0; i < BASE_64_CHARS.length; i++) {
	BASE_64_VALS[getChar(i)] = i;
}

const newBinary = (len: number) => new Uint8Array(new ArrayBuffer(len));

const encode = (array: ArrayLike<number> | string) => {
    /* Implementation Hidden */
};

const decode = (str: string) => {
    /* Implementation Hidden */
};

export const Base64 = { encode, decode, newBinary };

```