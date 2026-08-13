## File: apps/meteor/app/apps/server/converters/threads.ts

```typescript
import type { IAppRoomsConverter, IAppThreadsConverter, IAppUsersConverter, IAppsMessage, IAppsUser } from '@rocket.chat/apps';
import type { IMessage as AppsEngineMessage, IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { isEditedMessage, isFileAttachment } from '@rocket.chat/core-typings';
import type { IUser, IMessage } from '@rocket.chat/core-typings';
import { Messages } from '@rocket.chat/models';

import { cachedFunction } from './cachedFunction';
import { convertMessageFiles } from './convertMessageFiles';
import { transformMappedData } from './transformMappedData';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Orchestrator {
	rooms: () => {
		convertById: IAppRoomsConverter['convertById'];
	};
	users: () => {
		convertById: IAppUsersConverter['convertById'];
		convertToApp: IAppUsersConverter['convertToApp'];
	};
}

export class AppThreadsConverter implements IAppThreadsConverter {
	constructor(
		private readonly orch: {
			getConverters: () => {
				get: <O extends keyof Orchestrator>(key: O) => ReturnType<Orchestrator[O]>;
			};
		},
	) {
        /* Implementation Hidden */
    }

	async convertById(threadId: string) {
        /* Implementation Hidden */
    }

	async convertMessage(
		msgObj: IMessage,
		room: IRoom,
		convertUserById: ReturnType<Orchestrator['users']>['convertById'],
		convertToApp: ReturnType<Orchestrator['users']>['convertToApp'],
	): Promise<AppsEngineMessage> {
        /* Implementation Hidden */
    }

	async _convertAttachmentsToApp(
		attachments: NonNullable<IMessage['attachments']>,
		mainFile: IMessage['file'],
	): Promise<NonNullable<IAppsMessage['attachments']>> {
        /* Implementation Hidden */
    }
}

```