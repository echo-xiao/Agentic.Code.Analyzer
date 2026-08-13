## File: apps/meteor/client/views/room/contexts/RoomContext.ts

```typescript
import type { IRoom, IOmnichannelRoom, ISubscription } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { createContext, useContext } from 'react';

export interface IRoomWithFederationOriginalName extends IRoom {
	federationOriginalName?: string;
}

type RoomContextValue = {
	rid: IRoom['_id'];
	room: IRoomWithFederationOriginalName;
	subscription?: ISubscription;
	hasMorePreviousMessages: boolean;
	hasMoreNextMessages: boolean;
	isLoadingMoreMessages: boolean;
};

export const RoomContext = createContext<RoomContextValue | null>(null);

export const useUserIsSubscribed = (): boolean => {
    /* Implementation Hidden */
};

export const useRoom = (): IRoom => {
    /* Implementation Hidden */
};

export const useRoomSubscription = (): ISubscription | undefined => {
    /* Implementation Hidden */
};

export const useRoomMessages = (): {
	hasMorePreviousMessages: boolean;
	hasMoreNextMessages: boolean;
	isLoadingMoreMessages: boolean;
} => {
    /* Implementation Hidden */
};

export const useOmnichannelRoom = (): IOmnichannelRoom => {
    /* Implementation Hidden */
};

```