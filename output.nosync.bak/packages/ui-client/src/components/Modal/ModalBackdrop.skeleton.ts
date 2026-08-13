## File: packages/ui-client/src/components/Modal/ModalBackdrop.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { MouseEvent, ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';

const useEscapeKey = (onDismiss: (() => void) | undefined): void => {
    /* Implementation Hidden */
};

const isAtBackdropChildren = (e: MouseEvent, ref: RefObject<HTMLElement | null>): boolean => {
    /* Implementation Hidden */
};

const useOutsideClick = (ref: RefObject<HTMLElement | null>, onDismiss: (() => void) | undefined) => {
    /* Implementation Hidden */
};

type ModalBackdropProps = {
	children?: ReactNode;
	onDismiss?: () => void;
};

const ModalBackdrop = ({ children, onDismiss }: ModalBackdropProps) => {
    /* Implementation Hidden */
};

export default ModalBackdrop;

```