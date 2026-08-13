## File: apps/meteor/client/navbar/NavBarPagesGroup/hooks/useMatrixFederationItems.ts

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { useCreateRoomModal } from './useCreateRoomModal';
import MatrixFederationSearch from '../../../sidebar/header/MatrixFederationSearch';

export const useMatrixFederationItems = ({
	isMatrixEnabled,
}: {
	isMatrixEnabled: string | number | boolean | null | undefined;
}): GenericMenuItemProps[] => {
    /* Implementation Hidden */
};

```