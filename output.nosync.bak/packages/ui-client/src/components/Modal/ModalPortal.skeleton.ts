## File: packages/ui-client/src/components/Modal/ModalPortal.tsx

```typescript
import { useOwnerDocument } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { memo } from 'react';
import { createPortal } from 'react-dom';

const createModalRoot = (ownerDocument: Document): HTMLElement => {
    /* Implementation Hidden */
};

type ModalPortalProps = {
	children?: ReactNode;
};

const modalRoots = new WeakMap<Document, HTMLElement>();

const ModalPortal = ({ children }: ModalPortalProps) => {
    /* Implementation Hidden */
};

export default memo(ModalPortal);

```