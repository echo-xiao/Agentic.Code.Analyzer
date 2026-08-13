## File: apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts

```typescript
import { importRaw, getRandomValues, decryptBuffer, encryptBuffer, deriveBits, type IKey } from './shared';

type Algorithms = { name: 'AES-GCM'; length: 256 } | { name: 'AES-CBC'; length: 256 };

export type DerivedKey<TAlgorithm extends Algorithms = Algorithms> = IKey<
	TAlgorithm,
	false,
	'secret',
	TAlgorithm['name'] extends 'AES-CBC' ? ['decrypt'] : ['encrypt', 'decrypt']
>;

export type Options = {
	salt: Uint8Array<ArrayBuffer>;
	iterations: number;
};

export type EncryptedContent = {
	iv: Uint8Array<ArrayBuffer>;
	ciphertext: Uint8Array<ArrayBuffer>;
};

type Narrow<T, U extends { [P in keyof T]?: T[P] }> = {
	[P in keyof T]: P extends keyof U ? U[P] : T[P];
};

export type BaseKey = IKey<
	{
		readonly name: 'PBKDF2';
	},
	false,
	'secret',
	['deriveBits']
>;

export const importBaseKey = async (keyData: Uint8Array<ArrayBuffer>): Promise<BaseKey> => {
    /* Implementation Hidden */
};

type Throws<F> = F extends (...args: infer TArgs) => infer TRet ? (...args: TArgs) => TRet & never : never;

type FixedSizeArrayBuffer<N extends number> = Narrow<
	ArrayBuffer,
	{
		resize: Throws<ArrayBuffer['resize']>;
		readonly byteLength: N;
		get maxByteLength(): N;
		get resizable(): false;
		get detached(): false;
	}
>;

export type DerivedBits = FixedSizeArrayBuffer<32>;

export const derive = async (key: BaseKey, options: Options): Promise<DerivedBits> => {
    /* Implementation Hidden */
};

export const importKey = async <T extends Algorithms>(derivedBits: DerivedBits, algorithm: T): Promise<DerivedKey<T>> => {
    /* Implementation Hidden */
};

export const decrypt = async (key: DerivedKey, content: EncryptedContent): Promise<Uint8Array<ArrayBuffer>> => {
    /* Implementation Hidden */
};

export const encrypt = async (
	key: DerivedKey<{ name: 'AES-GCM'; length: 256 }>,
	data: Uint8Array<ArrayBuffer>,
): Promise<EncryptedContent> => {
    /* Implementation Hidden */
};

```