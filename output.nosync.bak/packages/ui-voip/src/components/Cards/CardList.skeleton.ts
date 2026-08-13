## File: packages/ui-voip/src/components/Cards/CardList.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';

type CardListProps = {
	children: ReactNode;
	shouldWrapCards?: boolean;
	direction?: 'row' | 'column';
	height?: number;
	marginInline?: 'auto' | number;
	overflow?: 'hidden' | 'scroll' | 'auto';
	autoMargin?: boolean;
};

const CardList = ({
	children,
	shouldWrapCards,
	direction = 'row',
	height,
	marginInline = 'auto',
	overflow,
	autoMargin = false,
}: CardListProps) => {
    /* Implementation Hidden */
};

export default CardList;

```