## File: apps/meteor/client/lib/e2ee/crypto/aes.ts

```typescript
import { importJwk, exportKey, getRandomValues, generateKey, type IKey, type Exported, encryptBuffer, decryptBuffer } from './shared';

type AlgorithmMap = {
	A256GCM: { name: 'AES-GCM'; length: 256 };
	A128CBC: { name: 'AES-CBC'; length: 128 };
};

const ALGORITHM_MAP: AlgorithmMap = {
	A256GCM: { name: 'AES-GCM', length: 256 },
	A128CBC: { name: 'AES-CBC', length: 128 },
};

type Jwa = keyof AlgorithmMap;
type Algorithms = AlgorithmMap[Jwa];

export type Key<TAlgorithm extends Algorithms = Algorithms, TExtractable extends CryptoKey['extractable'] = true> = IKey<
	TAlgorithm,
	TExtractable,
	'secret',
	['encrypt', 'decrypt']
>;

export type Jwk<TJwa extends Jwa = Jwa> = {
	kty: 'oct';
	k: string;
	key_ops: ['encrypt', 'decrypt'] | ['decrypt', 'encrypt'];
	ext: true;
	alg: TJwa;
};

type AesEncryptedContent = {
	iv: Uint8Array<ArrayBuffer>;
	ciphertext: Uint8Array<ArrayBuffer>;
};

export const importKey = <const TJwa extends Jwa>(jwk: Jwk<TJwa>): Promise<Key<AlgorithmMap[(typeof jwk)['alg']]>> => {
    /* Implementation Hidden */
};

export const exportJwk = <TAlgorithm extends Algorithms>(key: Key<TAlgorithm>): Promise<Exported<'jwk', Key<TAlgorithm>>> => {
    /* Implementation Hidden */
};

export const generate = (): Promise<Key<{ name: 'AES-GCM'; length: 256 }>> => {
    /* Implementation Hidden */
};

export const decrypt = async (key: Key, content: AesEncryptedContent): Promise<string> => {
    /* Implementation Hidden */
};

export const encrypt = async (key: Key, plaintext: Uint8Array<ArrayBuffer>): Promise<AesEncryptedContent> => {
    /* Implementation Hidden */
};

```