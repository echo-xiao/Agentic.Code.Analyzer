## File: apps/meteor/client/views/marketplace/AppsPage/AppsPageContent.tsx

```typescript
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { usePagination } from '@rocket.chat/ui-client';
import { useRouteParameter, useRouter } from '@rocket.chat/ui-contexts';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import AppsFilters from './AppsFilters';
import AppsPageConnectionError from './AppsPageConnectionError';
import AppsPageContentBody from './AppsPageContentBody';
import AppsPageContentSkeleton from './AppsPageContentSkeleton';
import NoAppRequestsEmptyState from './NoAppRequestsEmptyState';
import NoInstalledAppMatchesEmptyState from './NoInstalledAppMatchesEmptyState';
import NoInstalledAppsEmptyState from './NoInstalledAppsEmptyState';
import NoMarketplaceOrInstalledAppMatchesEmptyState from './NoMarketplaceOrInstalledAppMatchesEmptyState';
import PrivateEmptyState from './PrivateEmptyState';
import UnsupportedEmptyState from './UnsupportedEmptyState';
import MarketplaceHeader from '../components/MarketplaceHeader';
import type { RadioDropDownGroup } from '../definitions/RadioDropDownDefinitions';
import { useAppsReload } from '../hooks/useAppsReload';
import { useCategories } from '../hooks/useCategories';
import { useFilteredApps } from '../hooks/useFilteredApps';
import { useRadioToggle } from '../hooks/useRadioToggle';

type AppsContext = 'explore' | 'installed' | 'premium' | 'private' | 'requested';

const AppsPageContent = () => {
    /* Implementation Hidden */
};

export default AppsPageContent;

```