## File: apps/meteor/server/services/meteor/service.ts

```typescript
/* eslint-disable react-hooks/rules-of-hooks */
import { api, ServiceClassInternal } from '@rocket.chat/core-services';
import type { AutoUpdateRecord, IMeteor } from '@rocket.chat/core-services';
import type { ILivechatAgent, LoginServiceConfiguration, UserStatus } from '@rocket.chat/core-typings';
import { LoginServiceConfiguration as LoginServiceConfigurationModel, Users } from '@rocket.chat/models';
import { wrapExceptions } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';

import { processOnChange, serviceConfigCallbacks } from './userReactivity';
import { isOutgoingIntegration } from '../../../app/integrations/server/lib/definition';
import { triggerHandler } from '../../../app/integrations/server/lib/triggerHandler';
import { notifyGuestStatusChanged } from '../../../app/livechat/server/lib/guests';
import { onlineAgents, monitorAgents } from '../../../app/livechat/server/lib/stream/agentStatus';
import { metrics } from '../../../app/metrics/server';
import notifications from '../../../app/notifications/server/lib/Notifications';
import { settings } from '../../../app/settings/server';
import { use } from '../../../app/settings/server/Middleware';
import { setValue, updateValue } from '../../../app/settings/server/raw';
import { getURL } from '../../../app/utils/server/getURL';
import { configureEmailInboxes } from '../../features/EmailInbox/EmailInbox';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';
import { ListenersModule } from '../../modules/listeners/listeners.module';
import { invalidate as invalidatePublicationUserCache } from '../../modules/streamer/publication-user-cache';

const disableMsgRoundtripTracking = ['yes', 'true'].includes(String(process.env.DISABLE_MESSAGE_ROUNDTRIP_TRACKING).toLowerCase());

settings.set = use(settings.set, (context, next) => {
	next(...context);
	const [record] = context;
	updateValue(record._id, record);
});

const clientVersionsStore = new Map<string, AutoUpdateRecord>();

export class MeteorService extends ServiceClassInternal implements IMeteor {
	protected name = 'meteor';

	constructor() {
        /* Implementation Hidden */
    }

	override async started(): Promise<void> {
        /* Implementation Hidden */
    }

	async getAutoUpdateClientVersions(): Promise<Record<string, AutoUpdateRecord>> {
        /* Implementation Hidden */
    }

	async getLoginServiceConfiguration(): Promise<LoginServiceConfiguration[]> {
        /* Implementation Hidden */
    }

	async callMethodWithToken(
		userId: string,
		token: string,
		method: string,
		args: any[],
	): Promise<{
		result: unknown;
	}> {
        /* Implementation Hidden */
    }

	async notifyGuestStatusChanged(token: string, status: UserStatus): Promise<void> {
        /* Implementation Hidden */
    }

	async getURL(path: string, params: Record<string, any> = {}, cloudDeepLinkUrl?: string): Promise<string> {
        /* Implementation Hidden */
    }

	async getMessageURLToReplyTo(roomType: string, roomId: string, messageIdToReplyTo: string): Promise<string> {
        /* Implementation Hidden */
    }
}

```