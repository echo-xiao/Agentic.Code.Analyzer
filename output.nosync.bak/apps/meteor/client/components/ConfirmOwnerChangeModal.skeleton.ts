## File: apps/meteor/client/components/ConfirmOwnerChangeModal.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import type { ComponentPropsWithoutRef } from 'react';
import { Trans } from 'react-i18next';

export type ConfirmOwnerChangeModalProps = {
	shouldChangeOwner: string[];
	shouldBeRemoved: string[];
	contentTitle?: string;
} & Pick<ComponentPropsWithoutRef<typeof GenericModal>, 'onConfirm' | 'onCancel' | 'confirmText'>;

const ConfirmOwnerChangeModal = ({
	shouldChangeOwner,
	shouldBeRemoved,
	contentTitle,
	confirmText,
	onConfirm,
	onCancel,
}: ConfirmOwnerChangeModalProps) => {
    /* Implementation Hidden */
};

export default ConfirmOwnerChangeModal;

```