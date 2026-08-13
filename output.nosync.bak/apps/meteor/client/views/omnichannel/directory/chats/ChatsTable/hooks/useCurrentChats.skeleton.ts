## File: apps/meteor/client/views/omnichannel/directory/chats/ChatsTable/hooks/useCurrentChats.ts

```typescript
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { GETLivechatRoomsParams, OperationResult } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useCurrentChats = (query: GETLivechatRoomsParams): UseQueryResult<OperationResult<'GET', '/v1/livechat/rooms'>> => {
    /* Implementation Hidden */
};

```