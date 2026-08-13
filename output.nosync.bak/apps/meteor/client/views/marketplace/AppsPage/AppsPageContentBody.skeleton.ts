## File: apps/meteor/client/views/marketplace/AppsPage/AppsPageContentBody.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { Box, Pagination } from '@rocket.chat/fuselage';
import type { PaginatedResult } from '@rocket.chat/rest-typings';
import type { Dispatch, SetStateAction } from 'react';
import { useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import AppsList from '../AppsList';
import FeaturedAppsSections from './FeaturedAppsSections';

export type AppsPageContentBodyProps = {
	isMarketplace: boolean;
	isFiltered: boolean;
	appsResult?: PaginatedResult<{
		items: App[];
		shouldShowSearchText: boolean;
		allApps: App[];
		totalAppsLength: number;
	}>;
	itemsPerPage: 25 | 50 | 100;
	current: number;
	onSetItemsPerPage: Dispatch<SetStateAction<25 | 50 | 100>>;
	onSetCurrent: Dispatch<SetStateAction<number>>;
	paginationProps: {
		itemsPerPageLabel: () => string;
		showingResultsLabel: (context: { count: number; current: number; itemsPerPage: 25 | 50 | 100 }) => string;
	};
};

const AppsPageContentBody = ({
	isMarketplace,
	isFiltered,
	appsResult,
	itemsPerPage,
	current,
	onSetItemsPerPage,
	onSetCurrent,
	paginationProps,
}: AppsPageContentBodyProps) => {
    /* Implementation Hidden */
};

export default AppsPageContentBody;

```