## File: apps/meteor/client/lib/e2ee/crypto/rsa.ts

```typescript
import { generateKeyPair, exportKey, importJwk, type IKeyPair, encryptBuffer, decryptBuffer } from './shared';

export type KeyPair = IKeyPair<
	{
		readonly name: 'RSA-OAEP';
		readonly modulusLength: 2048;
		readonly publicExponent: Uint8Array<ArrayBuffer>;
		readonly hash: {
			readonly name: 'SHA-256';
		};
	},
	true,
	['encrypt', 'decrypt']
>;

export type PublicKey = KeyPair['publicKey'];

export type PrivateKey = KeyPair['privateKey'];

export const generate = async (): Promise<KeyPair> => {
    /* Implementation Hidden */
};

type Base64Url = string;

export interface IPublicJwk {
	kty: 'RSA';
	alg: 'RSA-OAEP-256';
	e: 'AQAB';
	ext: true;
	key_ops: ['encrypt'];
	n: Base64Url;
}

export interface IPrivateJwk {
	kty: 'RSA';
	alg: 'RSA-OAEP-256';
	e: 'AQAB';
	ext: true;
	d: Base64Url;
	dp: Base64Url;
	dq: Base64Url;
	key_ops: ['decrypt'];
	n: Base64Url;
	p: Base64Url;
	q: Base64Url;
	qi: Base64Url;
}

export const exportPublicKey = async (key: PublicKey): Promise<IPublicJwk> => {
    /* Implementation Hidden */
};

export const exportPrivateKey = async (key: PrivateKey): Promise<IPrivateJwk> => {
    /* Implementation Hidden */
};

export const importPrivateKey = async (keyData: IPrivateJwk): Promise<PrivateKey> => {
    /* Implementation Hidden */
};

export const importPublicKey = async (keyData: IPublicJwk): Promise<PublicKey> => {
    /* Implementation Hidden */
};

export const encrypt = async (key: PublicKey, data: BufferSource): Promise<Uint8Array<ArrayBuffer>> => {
    /* Implementation Hidden */
};

export const decrypt = async (key: PrivateKey, data: BufferSource): Promise<Uint8Array<ArrayBuffer>> => {
    /* Implementation Hidden */
};

```