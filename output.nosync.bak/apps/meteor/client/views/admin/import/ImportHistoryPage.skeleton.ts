## File: apps/meteor/client/views/admin/import/ImportHistoryPage.tsx

```typescript
import { Button, ButtonGroup, Table, TableHead, TableCell, TableRow, TableBody } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint, useTranslation, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import ImportOperationSummary from './ImportOperationSummary';
import ImportOperationSummarySkeleton from './ImportOperationSummarySkeleton';
import { ProgressStep } from '../../../../app/importer/lib/ImporterProgressStep';

// TODO: review inner logic
function ImportHistoryPage() {
    /* Implementation Hidden */
}

export default ImportHistoryPage;

```