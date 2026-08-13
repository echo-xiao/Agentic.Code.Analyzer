## File: apps/meteor/client/views/omnichannel/hooks/useDepartmentsList.ts

```typescript
import type { ILivechatDepartment, Serialized } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { DepartmentListItem } from '../types/DepartmentsDefinitions';

type DepartmentsListOptions = {
	filter: string;
	onlyMyDepartments?: boolean;
	haveAll?: boolean;
	haveNone?: boolean;
	excludeId?: string;
	enabled?: boolean;
	showArchived?: boolean;
	selectedDepartmentId?: string;
	limit?: number;
	unitId?: string;
};

const DEFAULT_QUERY_LIMIT = 50;

export const useDepartmentsList = (options: DepartmentsListOptions) => {
    /* Implementation Hidden */
};

```