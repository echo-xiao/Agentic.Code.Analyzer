## File: apps/meteor/client/sidebar/header/MatrixFederationSearch/FederatedRoomListErrorBoundary.tsx

```typescript
import { States, StatesIcon, StatesTitle, StatesSubtitle, StatesActions, StatesAction, Icon } from '@rocket.chat/fuselage';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

export type FederatedRoomListErrorBoundaryProps = {
	children?: ReactNode;
	resetKeys?: unknown[];
};

const FederatedRoomListErrorBoundary = ({ children, resetKeys }: FederatedRoomListErrorBoundaryProps) => {
    /* Implementation Hidden */
};

export default FederatedRoomListErrorBoundary;

```