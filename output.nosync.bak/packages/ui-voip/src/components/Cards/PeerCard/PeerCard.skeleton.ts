## File: packages/ui-voip/src/components/Cards/PeerCard/PeerCard.tsx

```typescript
import { Avatar, Box, Icon } from '@rocket.chat/fuselage';

import Card from '../Card';
import PeerCardSlot from './PeerCardSlot';

type PeerCardProps = {
	displayName: string;
	avatarUrl?: string;
	muted: boolean;
	held: boolean;
};

const PeerCard = ({ displayName, avatarUrl, muted, held }: PeerCardProps) => {
    /* Implementation Hidden */
};

export default PeerCard;

```