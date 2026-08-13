## File: apps/meteor/client/views/omnichannel/components/AutoCompleteContact/useContactsList.ts

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import type { ILivechatContactWithManagerData } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { omnichannelQueryKeys } from '../../../../lib/queryKeys';

export type ContactOption = Serialized<ILivechatContactWithManagerData> & {
	value: string;
	label: string;
};

type ContactOptions = {
	filter: string;
	limit?: number;
};

const DEFAULT_QUERY_LIMIT = 25;

const formatContactItem = (contact: Serialized<ILivechatContactWithManagerData>): ContactOption => ({
	...contact,
	label: contact.name || contact._id,
	value: contact._id,
});

export const useContactsList = (options: ContactOptions) => {
    /* Implementation Hidden */
};

```