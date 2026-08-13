## File: apps/meteor/client/views/account/tokens/AccountTokensTable/AccountTokensTable.tsx

```typescript
import { Box, Pagination, States, StatesAction, StatesActions, StatesIcon, StatesSubtitle, StatesTitle } from '@rocket.chat/fuselage';
import {
	GenericModal,
	GenericTable,
	GenericTableHeader,
	GenericTableBody,
	GenericTableLoadingTable,
	GenericTableHeaderCell,
	usePagination,
} from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useUserId, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import AccountTokensRow from './AccountTokensRow';
import AddToken from './AddToken';
import GenericNoResults from '../../../../components/GenericNoResults';
import { useResizeInlineBreakpoint } from '../../../../hooks/useResizeInlineBreakpoint';
import { miscQueryKeys } from '../../../../lib/queryKeys';

const AccountTokensTable = () => {
    /* Implementation Hidden */
};

export default AccountTokensTable;

```