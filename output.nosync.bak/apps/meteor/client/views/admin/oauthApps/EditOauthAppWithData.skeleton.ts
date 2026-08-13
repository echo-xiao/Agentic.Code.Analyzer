## File: apps/meteor/client/views/admin/oauthApps/EditOauthAppWithData.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import EditOauthApp from './EditOauthApp';
import { FormSkeleton } from '../../../components/Skeleton';

export type EditOauthAppWithDataProps = { _id: string };

const EditOauthAppWithData = ({ _id, ...props }: EditOauthAppWithDataProps) => {
    /* Implementation Hidden */
};

export default EditOauthAppWithData;

```