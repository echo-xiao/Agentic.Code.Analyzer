## File: apps/meteor/client/navbar/NavBarPagesGroup/hooks/useCreateNewItems.ts

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useTranslation, useSetting, useAtLeastOnePermission } from '@rocket.chat/ui-contexts';

import { useCreateRoomModal } from './useCreateRoomModal';
import CreateDiscussion from '../../../components/CreateDiscussion';
import { useOutboundMessageAccess } from '../../../views/omnichannel/components/outboundMessage/hooks';
import { useOutboundMessageModal } from '../../../views/omnichannel/components/outboundMessage/modals';
import CreateChannelModal from '../actions/CreateChannelModal';
import CreateDirectMessage from '../actions/CreateDirectMessage';
import CreateTeamModal from '../actions/CreateTeamModal';

const CREATE_CHANNEL_PERMISSIONS = ['create-c', 'create-p'];
const CREATE_TEAM_PERMISSIONS = ['create-team'];
const CREATE_DIRECT_PERMISSIONS = ['create-d'];
const CREATE_DISCUSSION_PERMISSIONS = ['start-discussion', 'start-discussion-other-user'];

export const useCreateNewItems = (): GenericMenuItemProps[] => {
    /* Implementation Hidden */
};

```