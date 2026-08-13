## File: apps/meteor/client/views/mediaCallHistory/CallHistoryPage.tsx

```typescript
import type { CallHistoryItem, Serialized } from '@rocket.chat/core-typings';
import { Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useSort, usePagination, GenericTableLoadingRow } from '@rocket.chat/ui-client';
import { useEndpoint, useRouteParameter, useRouter } from '@rocket.chat/ui-contexts';
import { MediaCallHistoryTable, isCallHistoryUnknownContact, isCallHistoryInternalContact } from '@rocket.chat/ui-voip';
import type { CallHistoryContact } from '@rocket.chat/ui-voip';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCallHistoryPageFilters } from './CallHistoryPageFilters';
import CallHistoryPageLayout from './CallHistoryPageLayout';
import CallHistoryRowExternalUser from './CallHistoryRowExternalUser';
import CallHistoryRowInternalUser from './CallHistoryRowInternalUser';
import CallHistoryRowUnknownUser from './CallHistoryRowUnknownUser';
import MediaCallHistoryContextualbar from './MediaCallHistoryContextualbar';
import { getExternalContact } from './MediaCallHistoryExternal';
import GenericNoResults from '../../components/GenericNoResults';
import UserInfoWithData from '../room/contextualBar/UserInfo/UserInfoWithData';

const getSort = (sortBy: 'contact' | 'type' | 'status' | 'timestamp', sortDirection: 'asc' | 'desc') => {
    /* Implementation Hidden */
};

const getStateFilter = <T extends string[]>(states: T): T | [...T, 'error'] | undefined => {
    /* Implementation Hidden */
};

const getContact = (item: Serialized<CallHistoryItem>): CallHistoryContact => {
    /* Implementation Hidden */
};

type DetailsTab = {
	openTab: 'details';
	rid: string;
};

type UserInfoTab = {
	openTab: 'user-info';
	rid: string;
	userId: string;
};

type Tab = DetailsTab | UserInfoTab;

const CallHistoryPage = () => {
    /* Implementation Hidden */
};

export default CallHistoryPage;

```