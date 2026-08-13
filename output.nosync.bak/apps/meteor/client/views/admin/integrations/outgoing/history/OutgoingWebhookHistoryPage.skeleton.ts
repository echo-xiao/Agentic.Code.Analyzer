## File: apps/meteor/client/views/admin/integrations/outgoing/history/OutgoingWebhookHistoryPage.tsx

```typescript
import { Button, ButtonGroup, Pagination } from '@rocket.chat/fuselage';
import { CustomScrollbars, usePagination, Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useRouteParameter, useMethod, useTranslation, useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { useMemo, useState, useEffect } from 'react';

import HistoryContent from './HistoryContent';
import { sdk } from '../../../../../../app/utils/client/lib/SDKClient';

const OutgoingWebhookHistoryPage = (props: ComponentProps<typeof Page>) => {
    /* Implementation Hidden */
};

export default OutgoingWebhookHistoryPage;

```