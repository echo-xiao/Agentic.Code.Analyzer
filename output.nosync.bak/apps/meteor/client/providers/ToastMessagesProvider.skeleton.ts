## File: apps/meteor/client/providers/ToastMessagesProvider.tsx

```typescript
import { ToastBarProvider, useToastBarDispatch } from '@rocket.chat/fuselage-toastbar';
import { ToastMessagesContext } from '@rocket.chat/ui-contexts';
import type { DefaultError, Query } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { isValidElement, useEffect } from 'react';

import { getErrorMessage } from '../lib/errorHandling';
import { dispatchToastMessage, subscribeToToastMessages } from '../lib/toast';

const contextValue = {
	dispatch: dispatchToastMessage,
};

export type ToastMessageInnerProviderProps = {
	children?: ReactNode;
};

const ToastMessageInnerProvider = ({ children }: ToastMessageInnerProviderProps) => {
    /* Implementation Hidden */
};

export type ToastMessagesProviderProps = {
	children?: ReactNode;
};

// eslint-disable-next-line react/no-multi-comp
const ToastMessagesProvider = ({ children }: ToastMessagesProviderProps) => (
	<ToastBarProvider>
		<ToastMessageInnerProvider>{children}</ToastMessageInnerProvider>
	</ToastBarProvider>
);

export default ToastMessagesProvider;

```