## File: packages/ui-client/src/components/PasswordVerifier/PasswordVerifierList.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { PasswordPolicyValidation } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { PasswordVerifierItem } from './PasswordVerifierItem';

export type PasswordVerifierListProps = {
	id?: string;
	validations: PasswordPolicyValidation[];
	vertical?: boolean;
};

export const PasswordVerifierList = ({ id, validations, vertical = true }: PasswordVerifierListProps) => {
    /* Implementation Hidden */
};

```