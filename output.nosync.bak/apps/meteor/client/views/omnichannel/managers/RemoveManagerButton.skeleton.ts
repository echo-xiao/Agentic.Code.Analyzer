## File: apps/meteor/client/views/omnichannel/managers/RemoveManagerButton.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal, GenericTableCell } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useEndpointMutation } from '../../../hooks/useEndpointMutation';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';

const RemoveManagerButton = ({ _id }: { _id: string }) => {
    /* Implementation Hidden */
};

export default RemoveManagerButton;

```