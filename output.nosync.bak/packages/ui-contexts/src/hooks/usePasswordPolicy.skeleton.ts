## File: packages/ui-contexts/src/hooks/usePasswordPolicy.ts

```typescript
import { PasswordPolicy, type PasswordPolicyOptions, type PasswordPolicyValidation } from '@rocket.chat/password-policies';
import { useMemo, useCallback } from 'react';

export type { PasswordPolicyValidation };

export type UsePasswordPolicyResult = {
	validations: PasswordPolicyValidation[];
	valid: boolean;
};

export type UsePasswordPolicyReturn = (password: string) => UsePasswordPolicyResult;

export type UsePasswordPolicy = (options: PasswordPolicyOptions) => UsePasswordPolicyReturn;

export const usePasswordPolicy: UsePasswordPolicy = (options) => {
    /* Implementation Hidden */
};

```