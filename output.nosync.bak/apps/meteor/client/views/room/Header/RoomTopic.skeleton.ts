## File: apps/meteor/client/views/room/Header/RoomTopic.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isPrivateRoom, isPublicRoom, isTeamRoom } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { useTranslation, useRouter } from '@rocket.chat/ui-contexts';

import MarkdownText from '../../../components/MarkdownText';
import { useCanEditRoom } from '../contextualBar/Info/hooks/useCanEditRoom';

export type RoomTopicProps = {
	room: IRoom;
};

const RoomTopic = ({ room }: RoomTopicProps) => {
    /* Implementation Hidden */
};

export default RoomTopic;

```