## File: apps/meteor/app/apple/lib/handleIdentityToken.ts

```typescript
import { createPublicKey, verify } from 'node:crypto';

import { serverFetch as fetch } from '@rocket.chat/server-fetch';

type AppleJWK = {
	kty: string;
	kid: string;
	use: string;
	alg: string;
	n: string;
	e: string;
};

type AppleJWTPayload = {
	iss: string;
	sub: string;
	aud: string | string[];
	exp: number;
	iat: number;
	email?: string;
	email_verified?: string | boolean;
	is_private_email?: string | boolean;
};

const DEFAULT_APPLE_AUDIENCES = ['chat.rocket.ios'];

let cachedKeys: AppleJWK[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

async function getApplePublicKeys(forceRefresh = false): Promise<AppleJWK[]> {
    /* Implementation Hidden */
}

function decodeBase64Url(str: string): string {
    /* Implementation Hidden */
}

async function verifyAppleJWT(
	headerB64: string,
	payloadB64: string,
	signatureB64: string,
	clientId: string,
): Promise<AppleJWTPayload | null> {
    /* Implementation Hidden */
}

export async function handleIdentityToken(identityToken: string, clientId: string): Promise<Record<string, any>> {
    /* Implementation Hidden */
}

```