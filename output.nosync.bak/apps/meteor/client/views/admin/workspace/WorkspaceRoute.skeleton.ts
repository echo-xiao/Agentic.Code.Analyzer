## File: apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx

```typescript
import { Callout, ButtonGroup, Button } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { usePermission } from '@rocket.chat/ui-contexts';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import WorkspacePage from './WorkspacePage';
import PageSkeleton from '../../../components/PageSkeleton';
import { useWorkspaceInfo } from '../../../hooks/useWorkspaceInfo';
import { downloadJsonAs } from '../../../lib/download';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const WorkspaceRoute = () => {
    /* Implementation Hidden */
};

export default memo(WorkspaceRoute);

```