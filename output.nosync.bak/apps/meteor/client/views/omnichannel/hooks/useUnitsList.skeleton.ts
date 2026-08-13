## File: apps/meteor/client/views/omnichannel/hooks/useUnitsList.ts

```typescript
import type { IOmnichannelBusinessUnit, Serialized } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

type UnitsListOptions = {
	filter: string;
	haveNone?: boolean;
	limit?: number;
};

export type UnitOption = {
	_id: string;
	value: string;
	label: string;
};

const DEFAULT_QUERY_LIMIT = 25;

export const useUnitsList = (options: UnitsListOptions) => {
    /* Implementation Hidden */
};

```