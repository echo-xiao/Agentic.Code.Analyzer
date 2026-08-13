## File: apps/meteor/client/views/room/contextualBar/NotificationPreferences/NotificationPreferencesWithData.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { useCustomSound, useToastMessageDispatch, useRoomToolbox, useUserPreference } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import NotificationPreferences from './NotificationPreferences';
import { useEndpointMutation } from '../../../../hooks/useEndpointMutation';
import { useRoom, useRoomSubscription } from '../../contexts/RoomContext';

const NotificationPreferencesWithData = () => {
    /* Implementation Hidden */
};

export default memo(NotificationPreferencesWithData);

```