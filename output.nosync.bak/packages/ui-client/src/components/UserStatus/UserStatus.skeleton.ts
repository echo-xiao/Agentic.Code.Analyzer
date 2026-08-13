## File: packages/ui-client/src/components/UserStatus/UserStatus.tsx

```typescript
import { StatusBullet } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export type UserStatusProps = {
	small?: boolean;
} & ComponentPropsWithoutRef<typeof StatusBullet>;

function UserStatus({ small, status, ...props }: UserStatusProps) {
    /* Implementation Hidden */
}

export default memo(UserStatus);

```