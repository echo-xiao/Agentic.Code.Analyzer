## File: apps/meteor/app/apps/server/bridges/bridges.js

```typescript
import { AppBridges } from '@rocket.chat/apps/dist/server/bridges/AppBridges';

import { AppActivationBridge } from './activation';
import { AppApisBridge } from './api';
import { AppCloudBridge } from './cloud';
import { AppCommandsBridge } from './commands';
import { AppContactBridge } from './contact';
import { AppDetailChangesBridge } from './details';
import { AppEmailBridge } from './email';
import { AppEnvironmentalVariableBridge } from './environmental';
import { AppExperimentalBridge } from './experimental';
import { AppHttpBridge } from './http';
import { AppInternalBridge } from './internal';
import { AppInternalFederationBridge } from './internalFederation';
import { AppListenerBridge } from './listeners';
import { AppLivechatBridge } from './livechat';
import { AppMessageBridge } from './messages';
import { AppModerationBridge } from './moderation';
import { AppOAuthAppsBridge } from './oauthApps';
import { OutboundCommunicationBridge } from './outboundCommunication';
import { AppPersistenceBridge } from './persistence';
import { AppRoleBridge } from './roles';
import { AppRoomBridge } from './rooms';
import { AppSchedulerBridge } from './scheduler';
import { AppSettingBridge } from './settings';
import { AppThreadBridge } from './thread';
import { UiInteractionBridge } from './uiInteraction';
import { AppUploadBridge } from './uploads';
import { AppUserBridge } from './users';
import { AppVideoConferenceBridge } from './videoConferences';

export class RealAppBridges extends AppBridges {
	constructor(orch) {
        /* Implementation Hidden */
    }

	getCommandBridge() {
        /* Implementation Hidden */
    }

	getApiBridge() {
        /* Implementation Hidden */
    }

	getEnvironmentalVariableBridge() {
        /* Implementation Hidden */
    }

	getHttpBridge() {
        /* Implementation Hidden */
    }

	getListenerBridge() {
        /* Implementation Hidden */
    }

	getMessageBridge() {
        /* Implementation Hidden */
    }

	getThreadBridge() {
        /* Implementation Hidden */
    }

	getPersistenceBridge() {
        /* Implementation Hidden */
    }

	getAppActivationBridge() {
        /* Implementation Hidden */
    }

	getAppDetailChangesBridge() {
        /* Implementation Hidden */
    }

	getRoomBridge() {
        /* Implementation Hidden */
    }

	getInternalBridge() {
        /* Implementation Hidden */
    }

	getServerSettingBridge() {
        /* Implementation Hidden */
    }

	getUserBridge() {
        /* Implementation Hidden */
    }

	getLivechatBridge() {
        /* Implementation Hidden */
    }

	getUploadBridge() {
        /* Implementation Hidden */
    }

	getUiInteractionBridge() {
        /* Implementation Hidden */
    }

	getSchedulerBridge() {
        /* Implementation Hidden */
    }

	getCloudWorkspaceBridge() {
        /* Implementation Hidden */
    }

	getVideoConferenceBridge() {
        /* Implementation Hidden */
    }

	getOutboundMessageBridge() {
        /* Implementation Hidden */
    }

	getOAuthAppsBridge() {
        /* Implementation Hidden */
    }

	getInternalFederationBridge() {
        /* Implementation Hidden */
    }

	getModerationBridge() {
        /* Implementation Hidden */
    }

	getRoleBridge() {
        /* Implementation Hidden */
    }

	getEmailBridge() {
        /* Implementation Hidden */
    }

	getContactBridge() {
        /* Implementation Hidden */
    }

	getExperimentalBridge() {
        /* Implementation Hidden */
    }
}

```