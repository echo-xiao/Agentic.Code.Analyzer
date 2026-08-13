## File: packages/ui-voip/src/components/Cards/StreamCard/StreamCard.tsx

```typescript
import type { ReactNode } from 'react';

import Card from '../Card';
import StreamCardOpenInRoomButton from './StreamCardOpenInRoom';
import StreamCardPin from './StreamCardPin';
import StreamCardStopSharingButton from './StreamCardStopSharingButton';

type StreamCardProps = {
	children: ReactNode;
	own?: boolean;
	onClickFocusStream?: () => void;
	onClickStopSharing?: () => void;
	onClickOpenInRoom?: () => void;
	focused?: boolean;
	autoHeight?: boolean;
	maxHeight?: number;
	showStopSharingOnHover?: boolean;
};

const alternateSizeProps = {
	maxWidth: '100%',
	maxHeight: '100%',
	height: undefined,
	width: undefined,
};

const StreamCard = ({
	children,
	own,
	onClickFocusStream,
	onClickStopSharing,
	onClickOpenInRoom,
	focused,
	autoHeight,
	maxHeight,
	showStopSharingOnHover = false,
}: StreamCardProps) => {
    /* Implementation Hidden */
};

export default StreamCard;

```