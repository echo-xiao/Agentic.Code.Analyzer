## File: packages/ui-client/src/components/Modal/ModalRegion.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useCurrentModal, useModal } from '@rocket.chat/ui-contexts';
import { lazy, Suspense } from 'react';

import ModalBackdrop from './ModalBackdrop';
import ModalPortal from './ModalPortal';

const FocusScope = lazy(() => import('@react-aria/focus').then((module) => ({ default: module.FocusScope })));

const ModalRegion = () => {
    /* Implementation Hidden */
};

export default ModalRegion;

```