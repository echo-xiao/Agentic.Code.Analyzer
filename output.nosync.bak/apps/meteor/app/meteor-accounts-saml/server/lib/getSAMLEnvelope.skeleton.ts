## File: apps/meteor/app/meteor-accounts-saml/server/lib/getSAMLEnvelope.ts

```typescript
import type { IIncomingMessage } from '@rocket.chat/core-typings';

import { SAMLUtils } from './Utils';
import type {
	SAMLEnvelope,
	SAMLBinding,
	SAMLDocumentType,
	SAMLRedirectEnvelope,
	SAMLPOSTEnvelope,
	SAMLBaseEnvelope,
} from '../definition/SAMLEnvelope';

function getStringAttribute(params: Record<string, any>, attributeName: string): string | null {
    /* Implementation Hidden */
}

async function performBindingSpecificDecoding(binding: SAMLBinding, buffer: Buffer<ArrayBuffer>): Promise<Buffer<ArrayBuffer>> {
    /* Implementation Hidden */
}

async function decodeDocument(base64Data: string, binding: SAMLBinding): Promise<string> {
    /* Implementation Hidden */
}

function getSignedContent(req: IIncomingMessage, documentType: SAMLDocumentType): string | null {
    /* Implementation Hidden */
}

export async function getSAMLEnvelope<T extends SAMLDocumentType = SAMLDocumentType>(
	req: IIncomingMessage,
	type: T,
	binding: 'HTTP-Redirect',
): Promise<SAMLRedirectEnvelope<T> | null>;
export async function getSAMLEnvelope<T extends SAMLDocumentType = SAMLDocumentType>(
	req: IIncomingMessage,
	type: T,
	binding: 'HTTP-POST',
): Promise<SAMLPOSTEnvelope<T> | null>;
export async function getSAMLEnvelope<B extends SAMLBinding, T extends SAMLDocumentType = SAMLDocumentType>(
	req: IIncomingMessage,
	type: T,
	binding: B,
): Promise<SAMLEnvelope<T> | null> {
    /* Implementation Hidden */
}

```