## File: apps/meteor/app/ui-utils/client/lib/RoomHistoryManager.ts

```typescript
import type { IMessage, IRoom, ISubscription } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import { differenceInMilliseconds } from 'date-fns';
import { useCallback, useSyncExternalStore } from 'react';

import { onClientMessageReceived } from '../../../../client/lib/onClientMessageReceived';
import { getUserId } from '../../../../client/lib/user';
import { callWithErrorHandling } from '../../../../client/lib/utils/callWithErrorHandling';
import { getConfig } from '../../../../client/lib/utils/getConfig';
import { Messages, Subscriptions } from '../../../../client/stores';
import { getUserPreference } from '../../../utils/client';

const processMessage = async (msg: IMessage & { ignored?: boolean }, { subscription }: { subscription?: ISubscription }) => {
    /* Implementation Hidden */
};

export async function upsertMessage({ msg, subscription }: { msg: IMessage & { ignored?: boolean }; subscription?: ISubscription }) {
    /* Implementation Hidden */
}

export async function upsertMessageBulk({
	msgs,
	subscription,
}: {
	msgs: (IMessage & { ignored?: boolean })[];
	subscription?: ISubscription;
}) {
    /* Implementation Hidden */
}

const defaultLimit = parseInt(getConfig('roomListLimit') ?? '50') || 50;

export type RoomHistoryState = {
	hasMore: boolean;
	hasMoreNext: boolean;
	isLoading: boolean;
	unreadNotLoaded: number;
	firstUnread: IMessage | undefined;
	loaded: number | undefined;
	oldestTs?: Date;
	scroll?: {
		scrollHeight: number;
		scrollTop: number;
	};
};

const roomStateEvent = (rid: IRoom['_id']) => `state:${rid}` as const;

class RoomHistoryManagerClass extends Emitter {
	private lastRequest?: Date;

	private histories: Record<IRoom['_id'], RoomHistoryState> = {};

	private requestsList: string[] = [];

	public getRoom(rid: IRoom['_id']): RoomHistoryState {
        /* Implementation Hidden */
    }

	public updateRoom(rid: IRoom['_id'], patch: Partial<RoomHistoryState>): void {
        /* Implementation Hidden */
    }

	public subscribeToRoom(rid: IRoom['_id'], cb: (state: RoomHistoryState) => void): () => void {
        /* Implementation Hidden */
    }

	private async queue(): Promise<void> {
        /* Implementation Hidden */
    }

	private run(fn: () => void) {
        /* Implementation Hidden */
    }

	public isLoaded(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	private unqueue() {
        /* Implementation Hidden */
    }

	public async getMore(rid: IRoom['_id'], { limit = defaultLimit }: { limit?: number } = {}): Promise<void> {
        /* Implementation Hidden */
    }

	public restoreScroll(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	public async getMoreNext(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	public hasMore(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	public hasMoreNext(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	public getMoreIfIsEmpty(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	public isLoading(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	public close(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	public clear(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	public async getSurroundingMessages(message?: Pick<IMessage, '_id' | 'rid'> & { ts?: Date }) {
        /* Implementation Hidden */
    }

	public async getSurroundingChannelMessages(message?: Pick<IMessage, '_id' | 'rid'> & { ts?: Date }) {
        /* Implementation Hidden */
    }

	private async loadSurroundingMessages(message: (Pick<IMessage, '_id' | 'rid'> & { ts?: Date }) | undefined, showThreadMessages: boolean) {
        /* Implementation Hidden */
    }
}

export const RoomHistoryManager = new RoomHistoryManagerClass();

export const useRoomHistoryState = <T>(rid: IRoom['_id'], selector: (state: RoomHistoryState) => T): T =>
	useSyncExternalStore(
		useCallback((onStoreChange) => RoomHistoryManager.subscribeToRoom(rid, onStoreChange), [rid]),
		() => selector(RoomHistoryManager.getRoom(rid)),
	);

```