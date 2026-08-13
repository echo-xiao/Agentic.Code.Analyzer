## File: apps/meteor/client/views/admin/subscription/hooks/useValidateLicense.ts

```typescript
import type { BehaviorWithContext } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

// Real licenses are well over this length; shorter input is still being typed.
export const MIN_LICENSE_LENGTH = 100;

export const isPlausibleLicense = (license: string): boolean => license.trim().length >= MIN_LICENSE_LENGTH;

// RestApiClient unwraps failures into their parsed body, so a rejection is the failure body, not a Response.
const isValidationFailure = (error: unknown): error is { reasons: BehaviorWithContext[] } =>
	typeof error === 'object' && error !== null && Array.isArray((error as { reasons?: unknown }).reasons);

export const useValidateLicense = (license: string) => {
    /* Implementation Hidden */
};

```