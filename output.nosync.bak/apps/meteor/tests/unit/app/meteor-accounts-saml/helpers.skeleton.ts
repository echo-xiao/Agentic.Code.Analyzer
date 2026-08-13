## File: apps/meteor/tests/unit/app/meteor-accounts-saml/helpers.ts

```typescript
import type {
	SAMLDocumentType,
	SAMLPOSTEnvelope,
	SAMLRedirectEnvelope,
} from '../../../../app/meteor-accounts-saml/server/definition/SAMLEnvelope';

export function makeLogoutEnvelope<T extends SAMLDocumentType>(
	type: T,
	xml: string,
	signedContent?: string,
	signature?: string,
): SAMLRedirectEnvelope<T> {
    /* Implementation Hidden */
}

export function makeLogoutRequestEnvelope(xml: string, signedContent?: string, signature?: string) {
    /* Implementation Hidden */
}

export function makeLogoutResponseEnvelope(xml: string, signedContent?: string, signature?: string) {
    /* Implementation Hidden */
}

export function makeLoginEnvelope<T extends SAMLDocumentType>(type: T, xml: string): SAMLPOSTEnvelope<T> {
    /* Implementation Hidden */
}

export function makeLoginResponseEnvelope(xml: string) {
    /* Implementation Hidden */
}

```