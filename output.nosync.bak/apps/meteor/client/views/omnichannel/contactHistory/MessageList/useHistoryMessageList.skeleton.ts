## File: apps/meteor/client/views/omnichannel/contactHistory/MessageList/useHistoryMessageList.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useInfiniteMessageQueryUpdates } from '../../../../hooks/useInfiniteMessageQueryUpdates';
import { omnichannelQueryKeys } from '../../../../lib/queryKeys';
import { getConfig } from '../../../../lib/utils/getConfig';
import { mapMessageFromApi } from '../../../../lib/utils/mapMessageFromApi';

type HistoryMessageListOptions = {
	filter: string;
	roomId: string;
};

export const useHistoryMessageList = ({ roomId, filter: searchTerm }: HistoryMessageListOptions) => {
    /* Implementation Hidden */
};

```