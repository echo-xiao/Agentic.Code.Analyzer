## File: apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslateWithData.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useLanguage, useToastMessageDispatch, useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

import AutoTranslate from './AutoTranslate';
import { useEndpointMutation } from '../../../../hooks/useEndpointMutation';
import { miscQueryKeys } from '../../../../lib/queryKeys';
import { useRoom, useRoomSubscription } from '../../contexts/RoomContext';

const AutoTranslateWithData = () => {
    /* Implementation Hidden */
};

export default memo(AutoTranslateWithData);

```