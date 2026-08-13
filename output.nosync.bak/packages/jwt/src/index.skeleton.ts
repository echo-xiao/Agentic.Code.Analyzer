## File: packages/jwt/src/index.ts

```typescript
import { SignJWT, importPKCS8, jwtVerify, importSPKI, generateKeyPair, exportSPKI, exportPKCS8 } from 'jose';
import type { JWTPayload } from 'jose';

export async function sign(keyObject: object, pkcs8: string, alg = 'RS256') {
    /* Implementation Hidden */
}

export async function verify(jwt: string, spki: string, alg = 'RS256') {
    /* Implementation Hidden */
}

export async function getPairs(): Promise<[string, string]> {
    /* Implementation Hidden */
}

```