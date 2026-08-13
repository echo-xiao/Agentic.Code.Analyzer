## File: apps/meteor/client/views/omnichannel/tags/TagEditWithDepartmentData.tsx

```typescript
import type { ILivechatTag, Serialized } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { ContextualbarSkeletonBody } from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import TagEdit from './TagEdit';

const TagEditWithDepartmentData = ({ tagData, onClose }: { tagData: Serialized<ILivechatTag>; onClose: () => void }) => {
    /* Implementation Hidden */
};

export default TagEditWithDepartmentData;

```