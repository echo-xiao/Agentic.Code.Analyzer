## File: apps/meteor/client/views/teams/contextualBar/info/useLeaveTeam.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRouter, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import LeaveTeam from './LeaveTeam';
import { useEndpointMutation } from '../../../../hooks/useEndpointMutation';

export const useLeaveTeam = ({ teamId }: IRoom) => {
    /* Implementation Hidden */
};

```