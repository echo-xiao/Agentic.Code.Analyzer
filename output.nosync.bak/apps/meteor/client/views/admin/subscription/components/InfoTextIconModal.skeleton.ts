## File: apps/meteor/client/views/admin/subscription/components/InfoTextIconModal.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export type InfoTextIconModalProps = {
	title: string;
	infoText: ReactNode;
};

const InfoTextIconModal = ({ title, infoText }: InfoTextIconModalProps) => {
    /* Implementation Hidden */
};

export default memo(InfoTextIconModal);

```