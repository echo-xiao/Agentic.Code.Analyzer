## File: packages/ui-client/src/providers/ModalProvider/ModalProvider.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ModalContext } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo, memo, useSyncExternalStore } from 'react';

import { modalStore } from './ModalStore';

type ModalProviderProps = {
	children?: ReactNode;
	region?: symbol;
};

const ModalProvider = ({ children, region }: ModalProviderProps) => {
    /* Implementation Hidden */
};

export default memo<typeof ModalProvider>(ModalProvider);

```