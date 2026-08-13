## File: packages/ui-voip/src/components/Cards/CardListPinned.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import { CustomScrollbars } from '@rocket.chat/ui-client';
import type { CSSProperties, ReactNode } from 'react';

import { CARD_MARGIN, CARD_MIN_WIDTH } from './Card';
import CardListContainer from './CardList';

type CardListPinnedProps = {
	children: ReactNode;
	focusedCard: ReactNode;
	flexDirection?: CSSProperties['flexDirection'];
};

// This is a workaround to center the card list when it's not overflowing yet.
const scrollbarContainerStyle = css`
	[data-overlayscrollbars-viewport] {
		display: flex;
	}
`;

const CardListPinned = ({ children, focusedCard, flexDirection = 'row' }: CardListPinnedProps) => {
    /* Implementation Hidden */
};

export default CardListPinned;

```