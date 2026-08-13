## File: apps/meteor/client/lib/getDirtyFields.ts

```typescript
import type { FieldValues } from 'react-hook-form';

/**
 * Helper function to get dirty fields from react-hook-form
 * @param allFields all fields object
 * @param dirtyFields dirty fields object
 * @returns all dirty fields object
 */
export const getDirtyFields = <T extends FieldValues>(
	allFields: T,
	dirtyFields: Partial<Record<keyof T, boolean | boolean[]>>,
): Partial<T> => {
    /* Implementation Hidden */
};

```