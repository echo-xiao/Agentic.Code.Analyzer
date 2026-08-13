## File: apps/meteor/client/lib/e2ee/keychain.ts

```typescript
import { Base64 } from '@rocket.chat/base64';

import { Binary } from './binary';
import type { ICodec } from './codec';
import * as Pbkdf2 from './crypto/pbkdf2';
import { randomUUID } from './crypto/shared';

/**
 * Version 1 format:
 * ```
 * json({ $binary: base64(iv[16] + ciphertext) })
 * ```
 */
interface IStoredKeyV1 {
	/**
	 * Base64-encoded binary data
	 * - first 16 bytes are the IV
	 * - remaining bytes are the ciphertext
	 */
	$binary: string;
}
/**
 * Version 2 format:
 * ```typescript
 * json({ iv: base64(iv[12]), ciphertext: base64(data[...]), salt: string(), iterations: number() })
 * ```
 */
interface IStoredKeyV2 {
	iv: string;
	ciphertext: string;
	salt: string;
	iterations: number;
}

type StoredKey = IStoredKeyV1 | IStoredKeyV2;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const StoredKey: ICodec<string, StoredKey> = {
	decode: (data) => {
		const json: unknown = JSON.parse(data);

		if (typeof json !== 'object' || json === null) {
			throw new TypeError('Invalid private key format');
		}

		if ('$binary' in json && typeof json.$binary === 'string') {
			return { $binary: json.$binary } satisfies IStoredKeyV1;
		}

		if (
			'iv' in json &&
			typeof json.iv === 'string' &&
			'ciphertext' in json &&
			typeof json.ciphertext === 'string' &&
			'salt' in json &&
			typeof json.salt === 'string' &&
			'iterations' in json &&
			typeof json.iterations === 'number'
		) {
			return { iv: json.iv, ciphertext: json.ciphertext, salt: json.salt, iterations: json.iterations } satisfies IStoredKeyV2;
		}

		throw new TypeError('Invalid private key format');
	},
	encode: (data) => JSON.stringify(data),
};

type EncryptedKeyContent = {
	iv: Uint8Array<ArrayBuffer>;
	ciphertext: Uint8Array<ArrayBuffer>;
};

type EncryptedKeyOptions = {
	salt: string;
	iterations: number;
};

type EncryptedKey = {
	content: EncryptedKeyContent;
	options: EncryptedKeyOptions;
};

class EncryptedKeyCodec implements ICodec<string, EncryptedKey, IStoredKeyV2> {
	userId: string;

	constructor(userId: string) {
        /* Implementation Hidden */
    }

	encode(encryptedKey: EncryptedKey): IStoredKeyV2 {
        /* Implementation Hidden */
    }

	decode(storedKey: string): EncryptedKey {
        /* Implementation Hidden */
    }
}

export class Keychain {
	private readonly userId: string;

	private readonly codec: EncryptedKeyCodec;

	constructor(userId: string) {
        /* Implementation Hidden */
    }

	async decryptKey(privateKey: string, password: string): Promise<string> {
        /* Implementation Hidden */
    }

	async encryptKey(privateKey: string, password: string): Promise<IStoredKeyV2> {
        /* Implementation Hidden */
    }
}

```