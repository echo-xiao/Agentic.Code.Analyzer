## File: apps/meteor/client/views/omnichannel/customFields/EditCustomFieldsWithData.tsx

```typescript
import type { ILivechatCustomField } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { ContextualbarSkeletonBody } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import EditCustomFields from './EditCustomFields';

const EditCustomFieldsWithData = ({ customFieldId, onClose }: { customFieldId: ILivechatCustomField['_id']; onClose: () => void }) => {
    /* Implementation Hidden */
};

export default EditCustomFieldsWithData;

```