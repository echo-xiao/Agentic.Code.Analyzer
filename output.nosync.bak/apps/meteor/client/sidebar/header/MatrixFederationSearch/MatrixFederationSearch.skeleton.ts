## File: apps/meteor/client/sidebar/header/MatrixFederationSearch/MatrixFederationSearch.tsx

```typescript
import { Modal, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalTitle, Skeleton } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import MatrixFederationSearchModalContent from './MatrixFederationSearchModalContent';
import { useMatrixServerList } from './useMatrixServerList';

export type MatrixFederationSearchProps = {
	onClose: () => void;
	defaultSelectedServer?: string;
};

const MatrixFederationSearch = ({ onClose, defaultSelectedServer }: MatrixFederationSearchProps) => {
    /* Implementation Hidden */
};

export default MatrixFederationSearch;

```