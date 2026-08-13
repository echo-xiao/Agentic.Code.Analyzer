## File: apps/meteor/client/views/room/Header/icons/Favorite.tsx

```typescript
import type { IRoom, ISubscription } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { HeaderState } from '@rocket.chat/ui-client';
import { useSetting, useTranslation } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

import { useUserIsSubscribed } from '../../contexts/RoomContext';
import { useToggleFavoriteMutation } from '../../hooks/useToggleFavoriteMutation';

export type FavoriteProps = { room: IRoom & { f?: ISubscription['f'] } };

const Favorite = ({ room: { _id, f: favorite = false, t: type, name } }: FavoriteProps) => {
    /* Implementation Hidden */
};

export default memo(Favorite);

```