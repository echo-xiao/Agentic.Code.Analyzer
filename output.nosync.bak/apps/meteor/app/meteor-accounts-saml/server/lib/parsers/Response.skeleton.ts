## File: apps/meteor/app/meteor-accounts-saml/server/lib/parsers/Response.ts

```typescript
import xmldom from '@xmldom/xmldom';
import xmlCrypto from 'xml-crypto';
import xmlenc from 'xml-encryption';

import type { ISAMLAssertion } from '../../definition/ISAMLAssertion';
import type { IServiceProviderOptions } from '../../definition/IServiceProviderOptions';
import type { SAMLPOSTEnvelope } from '../../definition/SAMLEnvelope';
import type { IResponseValidateCallback } from '../../definition/callbacks';
import { SAMLUtils } from '../Utils';
import { StatusCode } from '../constants';

type XmlParent = Element | Document;

export class ResponseParser {
	serviceProviderOptions: IServiceProviderOptions;

	constructor(serviceProviderOptions: IServiceProviderOptions) {
        /* Implementation Hidden */
    }

	public validate(envelope: SAMLPOSTEnvelope<'SAMLResponse'>, callback: IResponseValidateCallback): void {
        /* Implementation Hidden */
    }

	private _checkLogoutResponse(doc: Document, callback: IResponseValidateCallback): void {
        /* Implementation Hidden */
    }

	private getAssertion(response: Element, xml: string): ISAMLAssertion {
        /* Implementation Hidden */
    }

	private verifySignatures(response: Element, assertionData: ISAMLAssertion, xml: string): void {
        /* Implementation Hidden */
    }

	private validateResponseSignature(xml: string, cert: string, response: Element): boolean {
        /* Implementation Hidden */
    }

	private validateAssertionSignature(xml: string, cert: string, assertion: Element): boolean {
        /* Implementation Hidden */
    }

	private validateSignatureChildren(xml: string, cert: string, parent: Element): boolean {
        /* Implementation Hidden */
    }

	private validateSignature(xml: string, cert: string, signature: Element): any {
        /* Implementation Hidden */
    }

	private getIssuer(assertion: Element): any {
        /* Implementation Hidden */
    }

	private getSubject(assertion: Element): XmlParent {
        /* Implementation Hidden */
    }

	private validateSubjectConditions(subject: XmlParent): void {
        /* Implementation Hidden */
    }

	private validateNotBeforeNotOnOrAfterAssertions(element: Element): boolean {
        /* Implementation Hidden */
    }

	private validateAssertionConditions(assertion: Element): void {
        /* Implementation Hidden */
    }

	private mapAttributes(attributeStatement: Element, profile: Record<string, any>): void {
        /* Implementation Hidden */
    }
}

```