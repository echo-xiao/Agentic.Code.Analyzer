## File: apps/meteor/app/importer/server/classes/converters/RoomConverter.ts

```typescript
import type { IImportChannel, IImportChannelRecord, IRoom } from '@rocket.chat/core-typings';
import { Subscriptions, Rooms, Users } from '@rocket.chat/models';
import { removeEmpty } from '@rocket.chat/tools';
import limax from 'limax';

import { RecordConverter } from './RecordConverter';
import { createDirectMessage } from '../../../../../server/methods/createDirectMessage';
import { saveRoomSettings } from '../../../../channel-settings/server/methods/saveRoomSettings';
import { notifyOnSubscriptionChangedByRoomId } from '../../../../lib/server/lib/notifyListener';
import { createChannelMethod } from '../../../../lib/server/methods/createChannel';
import { createPrivateGroupMethod } from '../../../../lib/server/methods/createPrivateGroup';
import type { IConversionCallbacks } from '../../definitions/IConversionCallbacks';

export class RoomConverter extends RecordConverter<IImportChannelRecord> {
	public startedByUserId: string;

	async convertChannels(startedByUserId: string, callbacks: IConversionCallbacks = {}): Promise<void> {
        /* Implementation Hidden */
    }

	protected override async convertRecord(record: IImportChannelRecord): Promise<boolean> {
        /* Implementation Hidden */
    }

	async insertOrUpdateRoom(existingRoom: IRoom | null, data: IImportChannel, startedByUserId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async findExistingRoom(data: IImportChannel): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	async updateRoom(room: IRoom, roomData: IImportChannel, startedByUserId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async insertRoom(roomData: IImportChannel, startedByUserId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async archiveRoomById(rid: string) {
        /* Implementation Hidden */
    }

	async updateRoomId(_id: string, roomData: IImportChannel): Promise<void> {
        /* Implementation Hidden */
    }

	async getRoomCreatorId(roomData: IImportChannel, startedByUserId: string): Promise<string> {
        /* Implementation Hidden */
    }

	protected override getDataType(): 'channel' {
        /* Implementation Hidden */
    }
}

```