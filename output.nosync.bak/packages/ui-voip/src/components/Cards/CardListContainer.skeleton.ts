## File: packages/ui-voip/src/components/Cards/CardListContainer.tsx

```typescript
import type { ReactNode } from 'react';

import CardList from './CardList';
import CardListPinned from './CardListPinned';

type CardListContainerProps = {
	children: ReactNode;
	focusedCard?: ReactNode;
	shouldWrapCards?: boolean;
};

const CardListContainer = ({ children, focusedCard, shouldWrapCards }: CardListContainerProps) => {
    /* Implementation Hidden */
};

export default CardListContainer;

```