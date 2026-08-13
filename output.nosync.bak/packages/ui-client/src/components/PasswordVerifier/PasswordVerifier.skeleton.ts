## File: packages/ui-client/src/components/PasswordVerifier/PasswordVerifier.tsx

```typescript
import { useVerifyPassword } from '@rocket.chat/ui-contexts';

import { PasswordVerifierList, type PasswordVerifierListProps } from './PasswordVerifierList';

export type PasswordVerifierProps = Pick<PasswordVerifierListProps, 'id' | 'vertical'> & {
	password: string;
};

export const PasswordVerifier = ({ password, id, vertical }: PasswordVerifierProps) => {
    /* Implementation Hidden */
};

```