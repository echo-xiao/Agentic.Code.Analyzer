## File: packages/ui-voip/src/views/MediaCallCardList.tsx

```typescript
import { useState } from 'react';

import { CardListContainer, CardListSection, PeerCard, StreamCard } from '../components';
import { useMediaCallView } from '../context';
import { usePlayMediaStream } from '../providers/usePlayMediaStream';

type MediaCallCardListProps = {
	shouldWrapCards: boolean;
	user: {
		displayName: string;
		avatarUrl: string;
	};
};

const MediaCallCardList = ({ user, shouldWrapCards }: MediaCallCardListProps) => {
    /* Implementation Hidden */
};

export default MediaCallCardList;

```