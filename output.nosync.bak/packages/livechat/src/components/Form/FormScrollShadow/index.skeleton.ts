## File: packages/livechat/src/components/Form/FormScrollShadow/index.tsx

```typescript
import type { ComponentChildren, RefObject } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import styles from './styles.scss';
import { createClassName } from '../../../helpers/createClassName';

export const FormScrollShadow = ({
	topRef,
	bottomRef,
	children,
}: {
	children: ComponentChildren;
	topRef: RefObject<HTMLDivElement>;
	bottomRef: RefObject<HTMLDivElement>;
}) => {
    /* Implementation Hidden */
};

```