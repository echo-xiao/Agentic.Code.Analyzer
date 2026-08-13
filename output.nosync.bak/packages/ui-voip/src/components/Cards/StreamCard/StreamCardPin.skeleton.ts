## File: packages/ui-voip/src/components/Cards/StreamCard/StreamCardPin.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import CardSlotContainer from '../CardSlot';
import type { SlotPosition } from '../CardSlot';

type CardSlotPinProps = {
	onClick: () => void;
	focused?: boolean;
	position?: SlotPosition;
};

const CardSlotPin = ({ focused, onClick, position = 'bottomRight' }: CardSlotPinProps) => {
    /* Implementation Hidden */
};

export default CardSlotPin;

```