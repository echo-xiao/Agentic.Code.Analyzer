## File: apps/meteor/app/utils/server/lib/JWTHelper.ts

```typescript
import jsr from 'jsrsasign';

const HEADER = {
	typ: 'JWT',
	alg: 'HS256',
};

export const generateJWT = (payload: Record<string, any>, secret: string, options?: { aud?: string }): string => {
    /* Implementation Hidden */
};

export const validateAndDecodeJWT = (jwt: string, secret: string, options?: { aud?: string }): Record<string, any> | null => {
    /* Implementation Hidden */
};

```