## File: apps/meteor/client/views/room/RoomAnnouncement/RoomAnnouncement.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { AnnouncementBanner, GenericModal } from '@rocket.chat/ui-client';
import { useSetModal } from '@rocket.chat/ui-contexts';
import type { KeyboardEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../../../components/MarkdownText';

type RoomAnnouncementParams = {
	announcement: string;
};

const RoomAnnouncement = ({ announcement }: RoomAnnouncementParams) => {
    /* Implementation Hidden */
};

export default RoomAnnouncement;

```