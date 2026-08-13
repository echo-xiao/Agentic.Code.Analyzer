## File: apps/meteor/client/lib/errorHandling.ts

```typescript
import { t } from '../../app/utils/lib/i18n';

const isObject = (obj: unknown): obj is object => (typeof obj === 'object' || typeof obj === 'function') && obj !== null;

const hasProperty = <TProperty extends number | string | symbol>(
	obj: unknown,
	property: TProperty,
): obj is { [key in TProperty]: unknown } => isObject(obj) && property in obj;

const hasXHR = (
	error: object,
): error is {
	xhr: {
		responseJSON: {
			error: string;
			status: string;
			messages: string[];
			payload?: any;
		};
	};
} => hasProperty(error, 'xhr') && hasProperty(error.xhr, 'responseJSON');

export function getErrorMessage(error: unknown, defaultMessage?: string): string {
    /* Implementation Hidden */
}

```