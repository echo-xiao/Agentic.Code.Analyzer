## File: apps/meteor/tests/e2e/utils/omnichannel/rooms.ts

```typescript
import { faker } from '@faker-js/faker';

import { createFakeVisitor } from '../../../mocks/data';
import type { BaseTest } from '../test';

type UpdateRoomParams = { roomId: string; visitorId: string; tags: string[] };

type CloseRoomParams = { roomId: string; visitorToken: string };

type CreateRoomParams = { tags?: string[]; visitorToken: string; agentId?: string };

type CreateVisitorParams = { token: string; departmentId?: string; name?: string; email?: string };

type CreateConversationParams = { visitorName?: string; visitorToken?: string; agentId?: string; departmentId?: string };

export const updateRoom = async (api: BaseTest['api'], { roomId, visitorId, tags }: UpdateRoomParams) => {
    /* Implementation Hidden */
};

export const closeRoom = async (api: BaseTest['api'], { roomId, visitorToken }: CloseRoomParams) =>
	api.post('/livechat/room.close', { rid: roomId, token: visitorToken });

export const createRoom = async (api: BaseTest['api'], { visitorToken, agentId }: CreateRoomParams) => {
    /* Implementation Hidden */
};

export const createVisitor = async (api: BaseTest['api'], { name, token, departmentId }: CreateVisitorParams) => {
    /* Implementation Hidden */
};

export const sendMessageToRoom = async (
	api: BaseTest['api'],
	{ visitorToken, roomId, message }: { visitorToken: string; roomId: string; message?: string },
) => {
    /* Implementation Hidden */
};

export const createConversation = async (
	api: BaseTest['api'],
	{ visitorName, visitorToken, agentId, departmentId }: CreateConversationParams = {},
) => {
    /* Implementation Hidden */
};

```