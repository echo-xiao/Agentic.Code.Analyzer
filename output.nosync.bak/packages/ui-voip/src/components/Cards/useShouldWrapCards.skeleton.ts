## File: packages/ui-voip/src/components/Cards/useShouldWrapCards.ts

```typescript
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';

import { CARD_TOTAL_HEIGHT } from './Card';
import { SECTION_MAX_HEIGHT } from './CardListSection';
import { ACTION_STRIP_TOTAL_HEIGHT } from '../Actions/ActionStrip';

// The minimun height that will fit 2 cards on top of eachother
export const SECTION_MIN_HEIGHT_WRAP_COLLAPSED = (CARD_TOTAL_HEIGHT * 2 + ACTION_STRIP_TOTAL_HEIGHT) / (SECTION_MAX_HEIGHT / 100);

export const useShouldWrapCards = (showChat: boolean, containerHeight: number) => {
    /* Implementation Hidden */
};

```