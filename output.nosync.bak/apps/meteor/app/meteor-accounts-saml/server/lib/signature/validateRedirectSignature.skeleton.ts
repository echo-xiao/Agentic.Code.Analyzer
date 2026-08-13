## File: apps/meteor/app/meteor-accounts-saml/server/lib/signature/validateRedirectSignature.ts

```typescript
import crypto from 'node:crypto';

import type { SAMLRedirectEnvelope } from '../../definition/SAMLEnvelope';
import { SAMLUtils } from '../Utils';
import { getSigAlgKeyByURI } from './signatureAlgorithms';

export function validateRedirectSignature(envelope: SAMLRedirectEnvelope, certificate: string): boolean {
    /* Implementation Hidden */
}

```