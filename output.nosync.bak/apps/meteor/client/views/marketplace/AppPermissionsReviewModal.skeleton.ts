## File: apps/meteor/client/views/marketplace/AppPermissionsReviewModal.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import AppPermissionsList from './components/AppPermissionsList';

export type AppPermissionsReviewModalProps = {
	appPermissions: App['permissions'];
	onCancel: () => void;
	onConfirm: (permissionsGranted: AppPermissionsReviewModalProps['appPermissions']) => void;
};

const AppPermissionsReviewModal = ({ appPermissions, onCancel, onConfirm }: AppPermissionsReviewModalProps) => {
    /* Implementation Hidden */
};

export default AppPermissionsReviewModal;

```