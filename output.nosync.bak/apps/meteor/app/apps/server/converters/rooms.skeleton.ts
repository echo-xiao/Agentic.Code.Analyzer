## File: apps/meteor/app/apps/server/converters/rooms.js

```typescript
import { secureFieldsMapper } from '@rocket.chat/apps/dist/lib/SecureFields';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import { LivechatVisitors, Rooms, LivechatDepartment, Users, LivechatContacts } from '@rocket.chat/models';

import { transformMappedData } from './transformMappedData';

export class AppRoomsConverter {
	constructor(orch) {
        /* Implementation Hidden */
    }

	async convertById(roomId) {
        /* Implementation Hidden */
    }

	async convertByName(roomName) {
        /* Implementation Hidden */
    }

	convertRoomRaw(room) {
        /* Implementation Hidden */
    }

	async __getCreator(user) {
        /* Implementation Hidden */
    }

	async __getVisitor({ visitor: roomVisitor, visitorChannelInfo }) {
        /* Implementation Hidden */
    }

	async __getUserIdAndUsername(userObj) {
        /* Implementation Hidden */
    }

	async __getRoomCloser(room, v) {
        /* Implementation Hidden */
    }

	// TODO do we really need this?
	async __getContactId({ contact }) {
        /* Implementation Hidden */
    }

	// TODO do we really need this?
	async __getDepartment({ department }) {
        /* Implementation Hidden */
    }

	async convertAppRoom(room, isPartial = false) {
        /* Implementation Hidden */
    }

	async convertRoom(originalRoom) {
        /* Implementation Hidden */
    }

	_convertTypeToApp(typeChar) {
        /* Implementation Hidden */
    }
}

```