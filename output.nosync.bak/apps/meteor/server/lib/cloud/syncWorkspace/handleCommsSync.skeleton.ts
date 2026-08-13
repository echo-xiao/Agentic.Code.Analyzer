## File: apps/meteor/server/lib/cloud/syncWorkspace/handleCommsSync.ts

```typescript
import { NPS, Banner } from '@rocket.chat/core-services';
import type { Cloud, IBanner, Optional } from '@rocket.chat/core-typings';

import { getAndCreateNpsSurvey } from '../../../services/nps/getAndCreateNpsSurvey';

export const handleNpsOnWorkspaceSync = async (nps: Cloud.NpsSurveyAnnouncement) => {
    /* Implementation Hidden */
};

export const handleBannerOnWorkspaceSync = async (banners: Optional<IBanner, '_updatedAt'>[]) => {
    /* Implementation Hidden */
};

export const handleAnnouncementsOnWorkspaceSync = async (announcements: {
	create: Cloud.Announcement[];
	delete?: Cloud.Announcement['_id'][];
}) => {
    /* Implementation Hidden */
};

```