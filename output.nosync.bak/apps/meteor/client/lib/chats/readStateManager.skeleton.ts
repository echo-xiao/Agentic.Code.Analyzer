## File: apps/meteor/client/lib/chats/readStateManager.ts

```typescript
import type { IMessage, IRoom, ISubscription } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';

import { LegacyRoomManager } from '../../../app/ui-utils/client/lib/LegacyRoomManager';
import { RoomHistoryManager } from '../../../app/ui-utils/client/lib/RoomHistoryManager';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { withDebouncing } from '../../../lib/utils/highOrderFunctions';
import { Messages } from '../../stores';
import { getUserId } from '../user';

export class ReadStateManager extends Emitter {
	private rid: IRoom['_id'];

	private firstUnreadRecordId?: IMessage['_id'];

	private subscription?: ISubscription;

	public constructor(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	public getRid() {
        /* Implementation Hidden */
    }

	public onUnreadStateChange = (callback: () => void): (() => void) => {
		return this.on('unread-state-change', callback);
	};

	public getFirstUnreadRecordId = () => {
		return this.firstUnreadRecordId;
	};

	public subscribeToMessages() {
        /* Implementation Hidden */
    }

	public updateSubscription(subscription?: ISubscription) {
        /* Implementation Hidden */
    }

	private updateFirstUnreadRecordId() {
        /* Implementation Hidden */
    }

	private setFirstUnreadRecordId(firstUnreadRecordId: string | undefined) {
        /* Implementation Hidden */
    }

	public clearUnreadMark() {
        /* Implementation Hidden */
    }

	public handleWindowEvents = (): (() => void) => {
		const handleWindowFocus = () => {
			this.attemptMarkAsRead();
		};

		const handleWindowKeyUp = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				this.markAsRead();
				this.updateFirstUnreadRecordId();
			}
		};

		window.addEventListener('focus', handleWindowFocus);
		window.addEventListener('keyup', handleWindowKeyUp);

		return () => {
			window.removeEventListener('focus', handleWindowFocus);
			window.removeEventListener('keyup', handleWindowKeyUp);
		};
	};

	private isUnreadMarkVisible: () => boolean = () => false;

	public setIsUnreadMarkVisibleCallback(callback: () => boolean) {
        /* Implementation Hidden */
    }

	// This will only mark as read if the unread mark is visible
	public attemptMarkAsRead() {
        /* Implementation Hidden */
    }

	public debouncedMarkAsRead = withDebouncing({ wait: 1000 })(() => {
		try {
			return this.markAsRead();
		} catch (e) {
			console.error(e);
		}
	});

	// this will always mark as read.
	public async markAsRead() {
        /* Implementation Hidden */
    }
}

```