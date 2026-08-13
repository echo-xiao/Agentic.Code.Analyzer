## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/utils/errors.ts

```typescript
export class FormValidationError extends Error {
	constructor(message: string) {
        /* Implementation Hidden */
    }
}

export class FormFetchError extends Error {
	constructor(message: string) {
        /* Implementation Hidden */
    }
}

export class ContactNotFoundError extends FormFetchError {
	constructor() {
        /* Implementation Hidden */
    }
}

export class ProviderNotFoundError extends FormFetchError {
	constructor() {
        /* Implementation Hidden */
    }
}

```