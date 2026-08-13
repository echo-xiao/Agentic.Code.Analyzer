## File: apps/meteor/client/views/teams/contextualBar/info/useConvertToChannel.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { usePermission, useSetModal, useToastMessageDispatch, useUserId } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import ConvertToChannelModal from './ConvertToChannelModal';
import { useEndpointMutation } from '../../../../hooks/useEndpointMutation';

export const useConvertToChannel = ({ _id, teamId }: IRoom) => {
    /* Implementation Hidden */
};

```