## File: packages/apps/src/server/accessors/Reader.ts

```typescript
import type {
	ICloudWorkspaceRead,
	IEnvironmentRead,
	IExperimentalRead,
	ILivechatRead,
	IMessageRead,
	INotifier,
	IPersistenceRead,
	IRead,
	IRoomRead,
	IUploadRead,
	IUserRead,
	IVideoConferenceRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import type { IContactRead } from '@rocket.chat/apps-engine/definition/accessors/IContactRead';
import type { IOAuthAppsReader } from '@rocket.chat/apps-engine/definition/accessors/IOAuthAppsReader';
import type { IRoleRead } from '@rocket.chat/apps-engine/definition/accessors/IRoleRead';
import type { IThreadRead } from '@rocket.chat/apps-engine/definition/accessors/IThreadRead';

export class Reader implements IRead {
	constructor(
		private env: IEnvironmentRead,
		private message: IMessageRead,
		private persist: IPersistenceRead,
		private room: IRoomRead,
		private user: IUserRead,
		private noti: INotifier,
		private livechat: ILivechatRead,
		private upload: IUploadRead,
		private cloud: ICloudWorkspaceRead,
		private videoConf: IVideoConferenceRead,
		private contactRead: IContactRead,
		private oauthApps: IOAuthAppsReader,
		private thread: IThreadRead,
		private role: IRoleRead,
		private experimental: IExperimentalRead,
	) {
        /* Implementation Hidden */
    }

	public getEnvironmentReader(): IEnvironmentRead {
        /* Implementation Hidden */
    }

	public getThreadReader(): IThreadRead {
        /* Implementation Hidden */
    }

	public getMessageReader(): IMessageRead {
        /* Implementation Hidden */
    }

	public getPersistenceReader(): IPersistenceRead {
        /* Implementation Hidden */
    }

	public getRoomReader(): IRoomRead {
        /* Implementation Hidden */
    }

	public getUserReader(): IUserRead {
        /* Implementation Hidden */
    }

	public getNotifier(): INotifier {
        /* Implementation Hidden */
    }

	public getLivechatReader(): ILivechatRead {
        /* Implementation Hidden */
    }

	public getUploadReader(): IUploadRead {
        /* Implementation Hidden */
    }

	public getCloudWorkspaceReader(): ICloudWorkspaceRead {
        /* Implementation Hidden */
    }

	public getVideoConferenceReader(): IVideoConferenceRead {
        /* Implementation Hidden */
    }

	public getOAuthAppsReader(): IOAuthAppsReader {
        /* Implementation Hidden */
    }

	public getRoleReader(): IRoleRead {
        /* Implementation Hidden */
    }

	public getContactReader(): IContactRead {
        /* Implementation Hidden */
    }

	public getExperimentalReader(): IExperimentalRead {
        /* Implementation Hidden */
    }
}

```