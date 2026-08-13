## File: apps/meteor/client/views/root/MainLayout/UsernameCheck.tsx

```typescript
import { useUserId, useSetting } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import PasswordChangeCheck from './PasswordChangeCheck';
import RegisterUsername from './RegisterUsername';
import { useUserInfoQuery } from '../../../hooks/useUserInfoQuery';
import HomeSkeleton from '../../home/HomeSkeleton';

const UsernameCheck = ({ children }: { children: ReactNode }) => {
    /* Implementation Hidden */
};

export default UsernameCheck;

```