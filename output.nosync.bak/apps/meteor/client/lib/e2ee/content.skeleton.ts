## File: apps/meteor/client/lib/e2ee/content.ts

```typescript
import { Base64 } from '@rocket.chat/base64';
import type { EncryptedContent } from '@rocket.chat/core-typings';

type DecodedContent = {
	kid: string;
	iv: Uint8Array<ArrayBuffer>;
	ciphertext: Uint8Array<ArrayBuffer>;
};

interface ISlice {
	slice(start: number, end?: number): this;
}

/**
 * Splits a slice of data into two parts at the specified index.
 * @param data The data to split.
 * @param index The index at which to split the data.
 * @returns A tuple containing the two parts of the split data.
 */
const split = <T extends ISlice>(data: T, index: number): [T, T] => [data.slice(0, index), data.slice(index)];

/**
 * Decodes an encrypted content string in the format "kid + base64(iv + ciphertext)".
 * @param payload The encrypted content string.
 * @returns An object containing the key ID (kid), initialization vector (iv), and ciphertext.
 */
const decodeV1EncryptedContent = (
	payload: Omit<Extract<EncryptedContent, { algorithm: 'rc.v1.aes-sha2' }>, 'algorithm'>,
): DecodedContent => {
    /* Implementation Hidden */
};

/**
 * Decodes an encrypted content object with separate fields for kid, iv, and ciphertext.
 * @param payload The encrypted content object.
 * @returns An object containing the key ID (kid), initialization vector (iv), and ciphertext.
 */
const decodeV2EncryptedContent = (payload: Extract<EncryptedContent, { algorithm: 'rc.v2.aes-sha2' }>): DecodedContent => {
    /* Implementation Hidden */
};

const normalizePayload = (payload: string | EncryptedContent): EncryptedContent => {
    /* Implementation Hidden */
};

/**
 * Parses encrypted content from either a string or an object and decodes it into its components.
 * @param payload The encrypted content, either as a string or an object.
 * @returns An object containing the key ID (kid), initialization vector (iv), and ciphertext.
 * @throws Will throw an error if the encryption algorithm is unsupported.
 */
export const decodeEncryptedContent = (payload: string | EncryptedContent): DecodedContent => {
    /* Implementation Hidden */
};

```