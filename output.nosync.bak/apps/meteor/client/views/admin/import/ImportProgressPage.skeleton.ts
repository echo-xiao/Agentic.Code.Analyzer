## File: apps/meteor/client/views/admin/import/ImportProgressPage.tsx

```typescript
import type { ProgressStep } from '@rocket.chat/core-typings';
import { Box, Margins, ProgressBar, Throbber } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint, useStream, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useErrorHandler } from './useErrorHandler';
import { ImportingStartedStates } from '../../../../app/importer/lib/ImporterProgressStep';
import { numberFormat } from '../../../../lib/utils/stringUtils';

// TODO: review inner logic
const ImportProgressPage = function ImportProgressPage() {
    /* Implementation Hidden */
};

export default ImportProgressPage;

```