## File: apps/meteor/client/views/omnichannel/triggers/hooks/useFieldError.ts

```typescript
import type { Control, FieldError, FieldPath, FieldValues } from 'react-hook-form';
import { get, useFormState } from 'react-hook-form';

type UseFieldErrorProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>;
	name: FieldPath<TFieldValues> | FieldPath<TFieldValues>[];
};

export const useFieldError = <TFieldValues extends FieldValues>({ control, name }: UseFieldErrorProps<TFieldValues>) => {
    /* Implementation Hidden */
};

```