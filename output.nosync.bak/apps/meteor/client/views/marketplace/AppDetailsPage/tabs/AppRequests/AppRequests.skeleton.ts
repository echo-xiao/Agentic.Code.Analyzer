## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppRequests/AppRequests.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { Box, Pagination, States, StatesSubtitle, StatesTitle } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AppRequestItem from './AppRequestItem';
import AppRequestsLoading from './AppRequestsLoading';
import { useAppRequests } from '../../../hooks/useAppRequests';
import { useAppsReload } from '../../../hooks/useAppsReload';

type itemsPerPage = 25 | 50 | 100;

export type AppRequestsProps = { id: App['id']; isAdminUser: boolean };

const AppRequests = ({ id, isAdminUser }: AppRequestsProps) => {
    /* Implementation Hidden */
};

export default AppRequests;

```