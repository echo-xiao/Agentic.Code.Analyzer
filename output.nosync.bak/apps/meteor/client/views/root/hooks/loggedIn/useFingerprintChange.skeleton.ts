## File: apps/meteor/client/views/root/hooks/loggedIn/useFingerprintChange.tsx

```typescript
import { useEndpoint, useRole, useSetModal, useSetting, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

import FingerprintChangeModal from '../../../../components/FingerprintChangeModal';
import FingerprintChangeModalConfirmation from '../../../../components/FingerprintChangeModalConfirmation';

const reducer = (
	state: { openModal: boolean; openConfirmation: boolean; newWorkspace?: boolean },
	action: { type: 'openModal' | 'openConfirmation' | 'closeModal'; newWorkspace?: boolean },
) => {
    /* Implementation Hidden */
};

export const useFingerprintChange = () => {
    /* Implementation Hidden */
};

```