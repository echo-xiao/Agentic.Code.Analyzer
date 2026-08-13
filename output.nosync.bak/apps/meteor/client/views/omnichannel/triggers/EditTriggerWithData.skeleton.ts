## File: apps/meteor/client/views/omnichannel/triggers/EditTriggerWithData.tsx

```typescript
import type { ILivechatTrigger } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { ContextualbarSkeletonBody } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import EditTrigger from './EditTrigger';

const EditTriggerWithData = ({ triggerId, onClose }: { triggerId: ILivechatTrigger['_id']; onClose: () => void }) => {
    /* Implementation Hidden */
};

export default EditTriggerWithData;

```