## File: apps/meteor/client/stories/contexts/ModalContextMock.tsx

```typescript
import { ModalContext } from '@rocket.chat/ui-contexts';
import type { ContextType, ReactNode } from 'react';
import { useContext, useMemo } from 'react';
import { action } from 'storybook/actions';

const logAction = action('ModalContext');

export type ModalContextMockProps = {
	children: ReactNode;
};

const ModalContextMock = ({ children }: ModalContextMockProps) => {
    /* Implementation Hidden */
};

export default ModalContextMock;

```