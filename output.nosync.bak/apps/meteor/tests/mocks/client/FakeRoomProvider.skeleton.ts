## File: apps/meteor/tests/mocks/client/FakeRoomProvider.tsx

```typescript
import { faker } from '@faker-js/faker';
import type { IRoom, ISubscription } from '@rocket.chat/core-typings';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { RoomContext } from '../../../client/views/room/contexts/RoomContext';
import { createFakeRoom, createFakeSubscription } from '../data';

type FakeRoomProviderProps = {
	children?: ReactNode;
	roomOverrides?: Partial<IRoom>;
	subscriptionOverrides?: Partial<ISubscription>;
};

const FakeRoomProvider = ({ children, roomOverrides, subscriptionOverrides }: FakeRoomProviderProps) => {
    /* Implementation Hidden */
};

export default FakeRoomProvider;

```