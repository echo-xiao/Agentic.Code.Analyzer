## File: apps/meteor/client/views/omnichannel/agents/AgentsPage.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ContextualbarDialog, Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import { usePermission, useRouteParameter, useRouter } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import AgentEditWithData from './AgentEditWithData';
import AgentInfo from './AgentInfo';
import AgentsTable from './AgentsTable';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const AgentsPage = () => {
    /* Implementation Hidden */
};

export default AgentsPage;

```