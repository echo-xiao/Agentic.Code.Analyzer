## File: apps/meteor/client/views/admin/users/hooks/useConfirmOwnerChanges.tsx

```typescript
import { useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';

import ConfirmOwnerChangeWarningModal from '../../../../components/ConfirmOwnerChangeModal';

export const useConfirmOwnerChanges = (): ((
	action: (confirm?: boolean) => Promise<void>,
	modalProps: Pick<ComponentProps<typeof ConfirmOwnerChangeWarningModal>, 'contentTitle' | 'confirmText'>,
	onChange: () => void,
) => Promise<void>) => {
    /* Implementation Hidden */
};

```