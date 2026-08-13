## File: apps/meteor/client/navbar/NavBarSettingsToolbar/UserMenu/hooks/useStatusItems.tsx

```typescript
import type { ICustomUserStatus, IUser } from '@rocket.chat/core-typings';
import { UserStatus as UserStatusEnum } from '@rocket.chat/core-typings';
import { Box, Icon, RadioButton } from '@rocket.chat/fuselage';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { clientCallbacks } from '@rocket.chat/ui-client';
import { useEndpoint, useSetting, useStream } from '@rocket.chat/ui-contexts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCustomStatusModalHandler } from './useCustomStatusModalHandler';
import MarkdownText from '../../../../components/MarkdownText';
import { UserStatus } from '../../../../components/UserStatus';
import { useExpirationText } from '../../../../hooks/useExpirationText';
import { useFireGlobalEvent } from '../../../../hooks/useFireGlobalEvent';
import { userStatuses } from '../../../../lib/userStatuses';
import type { UserStatusDescriptor } from '../../../../lib/userStatuses';
import { mapCustomUserStatusFromApi } from '../../../../lib/utils/mapCustomUserStatusFromApi';
import { useStatusDisabledModal } from '../../../../views/admin/customUserStatus/hooks/useStatusDisabledModal';

export const useStatusItems = (user?: IUser): GenericMenuItemProps[] => {
    /* Implementation Hidden */
};

```