## File: apps/meteor/client/views/marketplace/components/UninstallGrandfatheredAppModal/UninstallGrandfatheredAppModal.tsx

```typescript
import {
	Button,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterAnnotation,
	ModalFooterControllers,
	ModalHeader,
	ModalHeaderText,
	ModalTitle,
} from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../../../../components/MarkdownText';
import { links } from '../../../../lib/links';
import type { MarketplaceRouteContext } from '../../hooks/useAppsCountQuery';
import { usePrivateAppsEnabled } from '../../hooks/usePrivateAppsEnabled';

export type UninstallGrandfatheredAppModalProps = {
	context: MarketplaceRouteContext;
	limit: number;
	appName: string;
	handleUninstall: () => void;
	handleClose: () => void;
};

const UninstallGrandfatheredAppModal = ({ context, limit, appName, handleUninstall, handleClose }: UninstallGrandfatheredAppModalProps) => {
    /* Implementation Hidden */
};

export default UninstallGrandfatheredAppModal;

```