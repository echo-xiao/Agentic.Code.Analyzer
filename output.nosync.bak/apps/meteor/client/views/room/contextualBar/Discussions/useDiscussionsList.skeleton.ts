## File: apps/meteor/client/views/room/contextualBar/Discussions/useDiscussionsList.ts

```typescript
import type { IDiscussionMessage, IMessage } from '@rocket.chat/core-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useInfiniteMessageQueryUpdates } from '../../../../hooks/useInfiniteMessageQueryUpdates';
import { roomsQueryKeys } from '../../../../lib/queryKeys';
import { getConfig } from '../../../../lib/utils/getConfig';
import { mapMessageFromApi } from '../../../../lib/utils/mapMessageFromApi';

export const useDiscussionsList = ({ rid, text }: { rid: IMessage['rid']; text?: string }) => {
    /* Implementation Hidden */
};

```