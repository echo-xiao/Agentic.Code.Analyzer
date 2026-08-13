## File: apps/meteor/app/ui-utils/client/lib/LegacyRoomManager.ts

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import { createPredicateFromFilter } from '@rocket.chat/mongo-adapter';
import { clientCallbacks } from '@rocket.chat/ui-client';
import type { Filter } from 'mongodb';

import { upsertMessage, RoomHistoryManager } from './RoomHistoryManager';
import { RoomManager } from '../../../../client/lib/RoomManager';
import { roomCoordinator } from '../../../../client/lib/rooms/roomCoordinator';
import { fireGlobalEvent } from '../../../../client/lib/utils/fireGlobalEvent';
import { getConfig } from '../../../../client/lib/utils/getConfig';
import { modifyMessageOnFilesDelete } from '../../../../client/lib/utils/modifyMessageOnFilesDelete';
import { Messages, Subscriptions } from '../../../../client/stores';
import { sdk } from '../../../utils/client/lib/SDKClient';

const maxRoomsOpen = parseInt(getConfig('maxRoomsOpen') ?? '5') || 5;

type ListenRoomPropsByRidProps = keyof OpenedRoom;
type ListenRoomPropsByRidPropsEvent = `${string}/${ListenRoomPropsByRidProps}`;

const listener = new Emitter<{
	[key in ListenRoomPropsByRidPropsEvent]: undefined;
}>();

type OpenedRoom = {
	typeName: string;
	rid: IRoom['_id'];
	ready: boolean;
	dom?: Node;
	streamActive?: boolean;
	unreadSince: Date | undefined;
	lastSeen: Date;
	unreadFirstId?: string;
	stream?: {
		stop: () => void;
	};
};

const openedRooms: Record<string, OpenedRoom> = {};

function close(typeName: string) {
    /* Implementation Hidden */
}

function closeOlderRooms() {
    /* Implementation Hidden */
}

async function closeAllRooms() {
    /* Implementation Hidden */
}

function listenRoomPropsByRid<T extends ListenRoomPropsByRidProps>(
	rid: IRoom['_id'],
	prop: T,
): {
	subscribe: (cb: () => void) => () => void;
	getSnapshotValue: () => OpenedRoom[T];
} {
    /* Implementation Hidden */
}

function setPropertyByRid<T extends ListenRoomPropsByRidProps>(room: OpenedRoom, prop: T, value: OpenedRoom[T]): OpenedRoom[T] | undefined;
function setPropertyByRid<T extends ListenRoomPropsByRidProps>(rid: IRoom['_id'], prop: T, value: OpenedRoom[T]): OpenedRoom[T] | undefined;
function setPropertyByRid<T extends ListenRoomPropsByRidProps>(
	ridOrRoom: IRoom['_id'] | OpenedRoom,
	prop: T,
	value: OpenedRoom[T],
): OpenedRoom[T] | undefined {
    /* Implementation Hidden */
}

function getOpenedRoomByRid(rid: IRoom['_id']) {
    /* Implementation Hidden */
}

function createDeleteQuery({
	excludePinned,
	ignoreDiscussion,
	rid,
	ts,
	users,
	ids,
}: {
	rid: IMessage['rid'];
	excludePinned: boolean;
	ignoreDiscussion: boolean;
	ts: Record<string, Date>;
	users: string[];
	ids?: string[];
}) {
    /* Implementation Hidden */
}

const openRoom = (typeName: string, record: OpenedRoom) => {
    /* Implementation Hidden */
};

function open({ typeName, rid }: { typeName: string; rid: IRoom['_id'] }) {
    /* Implementation Hidden */
}

let openedRoom: string | undefined = undefined;

export const LegacyRoomManager = {
	get openedRoom() {
		return openedRoom;
	},

	set openedRoom(rid) {
		openedRoom = rid;
	},

	get openedRooms() {
		return openedRooms;
	},
	listenRoomPropsByRid,
	setPropertyByRid,
	getOpenedRoomByRid,

	close,

	closeAllRooms,

	open,
};

```