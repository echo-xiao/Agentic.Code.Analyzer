## File: apps/meteor/client/sidebar/header/MatrixFederationSearch/MatrixFederationSearchModalContent.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Select, TextInput } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useSetModal } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import FederatedRoomList from './FederatedRoomList';
import FederatedRoomListErrorBoundary from './FederatedRoomListErrorBoundary';
import MatrixFederationManageServersModal from './MatrixFederationManageServerModal';
import MatrixFederationSearch from './MatrixFederationSearch';

export type MatrixFederationSearchModalContentProps = {
	servers: Array<{
		name: string;
		default: boolean;
		local: boolean;
	}>;
	defaultSelectedServer?: string;
};

const MatrixFederationSearchModalContent = ({ defaultSelectedServer, servers }: MatrixFederationSearchModalContentProps) => {
    /* Implementation Hidden */
};

export default MatrixFederationSearchModalContent;

```