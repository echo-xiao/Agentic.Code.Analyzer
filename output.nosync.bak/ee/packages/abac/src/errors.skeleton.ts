## File: ee/packages/abac/src/errors.ts

```typescript
import { MeteorError, isMeteorError } from '@rocket.chat/core-services';

export enum AbacErrorCode {
	InvalidAttributeValues = 'error-invalid-attribute-values',
	InvalidAttributeKey = 'error-invalid-attribute-key',
	AttributeNotFound = 'error-attribute-not-found',
	AttributeInUse = 'error-attribute-in-use',
	DuplicateAttributeKey = 'error-duplicate-attribute-key',
	AttributeDefinitionNotFound = 'error-attribute-definition-not-found',
	RoomNotFound = 'error-room-not-found',
	CannotConvertDefaultRoomToAbac = 'error-cannot-convert-default-room-to-abac',
	AbacUnsupportedObjectType = 'error-abac-unsupported-object-type',
	AbacUnsupportedOperation = 'error-abac-unsupported-operation',
	OnlyCompliantCanBeAddedToRoom = 'error-only-compliant-users-can-be-added-to-abac-rooms',
	PdpUnavailable = 'error-pdp-unavailable',
	AttributeStoreExternal = 'error-abac-attribute-store-external',
	EntityResolutionFailed = 'error-virtru-entity-resolution-failed',
	NotAuthorizedToModifyRoom = 'error-abac-not-authorized-to-modify-room',
}

export class AbacError extends Error {
	public readonly code: AbacErrorCode;

	public readonly details?: unknown;

	constructor(code: AbacErrorCode, details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacInvalidAttributeValuesError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacInvalidAttributeKeyError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacAttributeNotFoundError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacAttributeInUseError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacDuplicateAttributeKeyError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacAttributeDefinitionNotFoundError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacRoomNotFoundError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacCannotConvertDefaultRoomToAbacError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacUnsupportedObjectTypeError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacUnsupportedOperationError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class OnlyCompliantCanBeAddedToRoomError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class PdpUnavailableError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacAttributeStoreExternalError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacEntityResolutionFailedError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class AbacNotAuthorizedToModifyRoomError extends AbacError {
	constructor(details?: unknown) {
        /* Implementation Hidden */
    }
}

export class PdpHealthCheckError extends MeteorError {
	constructor(errorCode: string) {
        /* Implementation Hidden */
    }
}

export const getPdpHealthErrorCode = (err: unknown): string => {
    /* Implementation Hidden */
};

```