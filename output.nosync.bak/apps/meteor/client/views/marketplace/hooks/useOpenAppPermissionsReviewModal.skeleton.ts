## File: apps/meteor/client/views/marketplace/hooks/useOpenAppPermissionsReviewModal.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import type { AppPermissionsReviewModalProps } from '../AppPermissionsReviewModal';
import AppPermissionsReviewModal from '../AppPermissionsReviewModal';

export const useOpenAppPermissionsReviewModal: (params: {
	app: App;
	onCancel: AppPermissionsReviewModalProps['onCancel'];
	onConfirm: AppPermissionsReviewModalProps['onConfirm'];
}) => () => void = ({ app, onCancel, onConfirm }) => {
    /* Implementation Hidden */
};

```