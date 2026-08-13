## File: apps/meteor/client/views/omnichannel/tags/TagEditWithData.tsx

```typescript
import type { ILivechatTag } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { ContextualbarSkeletonBody } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import TagEdit from './TagEdit';
import TagEditWithDepartmentData from './TagEditWithDepartmentData';

const TagEditWithData = ({ tagId, onClose }: { tagId: ILivechatTag['_id']; onClose: () => void }) => {
    /* Implementation Hidden */
};

export default TagEditWithData;

```