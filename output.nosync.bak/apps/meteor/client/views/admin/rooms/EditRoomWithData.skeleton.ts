## File: apps/meteor/client/views/admin/rooms/EditRoomWithData.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { ContextualbarHeader, ContextualbarTitle, ContextualbarClose, ContextualbarSkeletonBody } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import EditRoom from './EditRoom';

export type EditRoomWithDataProps = { rid?: IRoom['_id']; onReload: () => void; onClose: () => void };

const EditRoomWithData = ({ rid, onReload, onClose }: EditRoomWithDataProps) => {
    /* Implementation Hidden */
};

export default EditRoomWithData;

```