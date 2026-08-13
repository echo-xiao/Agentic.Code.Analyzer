## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useReportUser.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useEndpoint, useSetModal, useToastMessageDispatch, useUserId } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ReportUserModal from '../../../contextualBar/UserInfo/ReportUserModal';
import type { UserInfoAction } from '../useUserInfoActions';

export const useReportUser = (user: Pick<IUser, '_id' | 'username' | 'name'>): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```