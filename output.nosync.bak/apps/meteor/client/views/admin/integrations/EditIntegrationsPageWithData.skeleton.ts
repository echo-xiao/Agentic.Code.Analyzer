## File: apps/meteor/client/views/admin/integrations/EditIntegrationsPageWithData.tsx

```typescript
import type { IIncomingIntegration } from '@rocket.chat/core-typings';
import { Box, Skeleton } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import EditIncomingWebhook from './incoming/EditIncomingWebhook';
import EditOutgoingWebhook from './outgoing/EditOutgoingWebhook';

export type EditIntegrationsPageWithDataProps = { integrationId: IIncomingIntegration['_id'] };

const EditIntegrationsPageWithData = ({ integrationId }: EditIntegrationsPageWithDataProps) => {
    /* Implementation Hidden */
};

export default EditIntegrationsPageWithData;

```