## File: apps/meteor/server/modules/listeners/listeners.module.ts

```typescript
import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { ISetting as AppsSetting } from '@rocket.chat/apps-engine/definition/settings';
import type { IServiceClass } from '@rocket.chat/core-services';
import { EnterpriseSettings } from '@rocket.chat/core-services';
import { isSettingColor, isSettingEnterprise, UserStatus } from '@rocket.chat/core-typings';
import type { IUser, IRoom, IRole, VideoConference, ISetting, IOmnichannelRoom, PresenceStatusCode } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import type { ServerMediaSignal } from '@rocket.chat/media-signaling';
import { parse } from '@rocket.chat/message-parser';

import { settings } from '../../../app/settings/server/cached';
import type { NotificationsModule } from '../notifications/notifications.module';

const isMessageParserDisabled = process.env.DISABLE_MESSAGE_PARSER === 'true';

const STATUS_MAP: Record<UserStatus, PresenceStatusCode> = {
	[UserStatus.OFFLINE]: 0,
	[UserStatus.ONLINE]: 1,
	[UserStatus.AWAY]: 2,
	[UserStatus.BUSY]: 3,
	[UserStatus.DISABLED]: 0,
} as const;

const minimongoChangeMap: Record<string, string> = {
	inserted: 'added',
	updated: 'changed',
	removed: 'removed',
} as const;

export class ListenersModule {
	constructor(service: IServiceClass, notifications: NotificationsModule) {
        /* Implementation Hidden */
    }
}

```