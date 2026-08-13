## File: packages/apps/tests/test-data/bridges/appBridges.ts

```typescript
import { TestOAuthAppsBridge } from './OAuthAppsBridge';
import { TestsActivationBridge } from './activationBridge';
import { TestsApiBridge } from './apiBridge';
import { TestsAppDetailChangesBridge } from './appDetailChanges';
import { TestAppCloudWorkspaceBridge } from './cloudBridge';
import { TestsCommandBridge } from './commandBridge';
import { TestContactBridge } from './contactBridge';
import { TestsEmailBridge } from './emailBridge';
import { TestsEnvironmentalVariableBridge } from './environmentalVariableBridge';
import { TestExperimentalBridge } from './experimentalBridge';
import { TestsHttpBridge } from './httpBridge';
import { TestsInternalBridge } from './internalBridge';
import { TestsInternalFederationBridge } from './internalFederationBridge';
import { TestLivechatBridge } from './livechatBridge';
import { TestsMessageBridge } from './messageBridge';
import { TestsModerationBridge } from './moderationBridge';
import { TestOutboundCommunicationBridge } from './outboundComms';
import { TestsPersisBridge } from './persisBridge';
import { TestsRoleBridge } from './roleBridge';
import { TestsRoomBridge } from './roomBridge';
import { TestSchedulerBridge } from './schedulerBridge';
import { TestsServerSettingBridge } from './serverSettingBridge';
import { TestsThreadBridge } from './threadBridge';
import { TestsUiIntegrationBridge } from './uiIntegrationBridge';
import { TestUploadBridge } from './uploadBridge';
import { TestsUserBridge } from './userBridge';
import { TestsVideoConferenceBridge } from './videoConferenceBridge';
import { AppBridges } from '../../../src/server/bridges';
import type {
	AppActivationBridge,
	AppDetailChangesBridge,
	ContactBridge,
	EnvironmentalVariableBridge,
	ExperimentalBridge,
	HttpBridge,
	IInternalBridge,
	IListenerBridge,
	LivechatBridge,
	MessageBridge,
	ModerationBridge,
	OutboundMessageBridge,
	PersistenceBridge,
	RoleBridge,
	RoomBridge,
	SchedulerBridge,
	ServerSettingBridge,
	UiInteractionBridge,
	UploadBridge,
	UserBridge,
	VideoConferenceBridge,
} from '../../../src/server/bridges';
import type { CloudWorkspaceBridge } from '../../../src/server/bridges/CloudWorkspaceBridge';
import type { EmailBridge } from '../../../src/server/bridges/EmailBridge';
import type { IInternalFederationBridge } from '../../../src/server/bridges/IInternalFederationBridge';
import type { OAuthAppsBridge } from '../../../src/server/bridges/OAuthAppsBridge';
import type { ThreadBridge } from '../../../src/server/bridges/ThreadBridge';

export class TestsAppBridges extends AppBridges {
	private readonly appDetails: TestsAppDetailChangesBridge;

	private readonly cmdBridge: TestsCommandBridge;

	private readonly apiBridge: TestsApiBridge;

	private readonly setsBridge: TestsServerSettingBridge;

	private readonly envBridge: TestsEnvironmentalVariableBridge;

	private readonly rlActBridge: TestsActivationBridge;

	private readonly msgBridge: TestsMessageBridge;

	private readonly moderationBridge: TestsModerationBridge;

	private readonly persisBridge: TestsPersisBridge;

	private readonly roleBridge: TestsRoleBridge;

	private readonly roomBridge: TestsRoomBridge;

	private readonly internalBridge: TestsInternalBridge;

	private readonly userBridge: TestsUserBridge;

	private readonly httpBridge: TestsHttpBridge;

	private readonly livechatBridge: TestLivechatBridge;

	private readonly uploadBridge: TestUploadBridge;

	private readonly emailBridge: EmailBridge;

	private readonly contactBridge: ContactBridge;

	private readonly uiIntegrationBridge: TestsUiIntegrationBridge;

	private readonly schedulerBridge: TestSchedulerBridge;

	private readonly cloudWorkspaceBridge: TestAppCloudWorkspaceBridge;

	private readonly videoConfBridge: TestsVideoConferenceBridge;

	private readonly oauthBridge: OAuthAppsBridge;

	private readonly internalFederationBridge: IInternalFederationBridge;

	private readonly threadBridge: ThreadBridge;

	private readonly outboundCommsBridge: TestOutboundCommunicationBridge;

	private readonly experimentalBridge: TestExperimentalBridge;

	constructor() {
        /* Implementation Hidden */
    }

	public getCommandBridge(): TestsCommandBridge {
        /* Implementation Hidden */
    }

	public getApiBridge(): TestsApiBridge {
        /* Implementation Hidden */
    }

	public getServerSettingBridge(): ServerSettingBridge {
        /* Implementation Hidden */
    }

	public getEnvironmentalVariableBridge(): EnvironmentalVariableBridge {
        /* Implementation Hidden */
    }

	public getAppDetailChangesBridge(): AppDetailChangesBridge {
        /* Implementation Hidden */
    }

	public getHttpBridge(): HttpBridge {
        /* Implementation Hidden */
    }

	public getListenerBridge(): IListenerBridge {
        /* Implementation Hidden */
    }

	public getMessageBridge(): MessageBridge {
        /* Implementation Hidden */
    }

	public getModerationBridge(): ModerationBridge {
        /* Implementation Hidden */
    }

	public getPersistenceBridge(): PersistenceBridge {
        /* Implementation Hidden */
    }

	public getAppActivationBridge(): AppActivationBridge {
        /* Implementation Hidden */
    }

	public getThreadBridge(): ThreadBridge {
        /* Implementation Hidden */
    }

	public getRoleBridge(): RoleBridge {
        /* Implementation Hidden */
    }

	public getRoomBridge(): RoomBridge {
        /* Implementation Hidden */
    }

	public getInternalBridge(): IInternalBridge {
        /* Implementation Hidden */
    }

	public getUserBridge(): UserBridge {
        /* Implementation Hidden */
    }

	public getLivechatBridge(): LivechatBridge {
        /* Implementation Hidden */
    }

	public getEmailBridge(): EmailBridge {
        /* Implementation Hidden */
    }

	public getUploadBridge(): UploadBridge {
        /* Implementation Hidden */
    }

	public getUiInteractionBridge(): UiInteractionBridge {
        /* Implementation Hidden */
    }

	public getSchedulerBridge(): SchedulerBridge {
        /* Implementation Hidden */
    }

	public getCloudWorkspaceBridge(): CloudWorkspaceBridge {
        /* Implementation Hidden */
    }

	public getVideoConferenceBridge(): VideoConferenceBridge {
        /* Implementation Hidden */
    }

	public getOAuthAppsBridge(): OAuthAppsBridge {
        /* Implementation Hidden */
    }

	public getInternalFederationBridge(): IInternalFederationBridge {
        /* Implementation Hidden */
    }

	public getContactBridge(): ContactBridge {
        /* Implementation Hidden */
    }

	public getOutboundMessageBridge(): OutboundMessageBridge {
        /* Implementation Hidden */
    }

	public getExperimentalBridge(): ExperimentalBridge {
        /* Implementation Hidden */
    }
}

```