## File: apps/meteor/client/views/admin/import/ImportRoute.tsx

```typescript
import { usePermission } from '@rocket.chat/ui-contexts';

import ImportHistoryPage from './ImportHistoryPage';
import ImportProgressPage from './ImportProgressPage';
import NewImportPage from './NewImportPage';
import PrepareImportPage from './PrepareImportPage';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

export type ImportHistoryRouteProps = {
	page: 'history' | 'new' | 'prepare' | 'progress';
};

function ImportHistoryRoute({ page }: ImportHistoryRouteProps) {
    /* Implementation Hidden */
}

export default ImportHistoryRoute;

```