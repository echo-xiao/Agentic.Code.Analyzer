## File: apps/meteor/app/apps/server/bridges/listeners.ts

```typescript
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import type { IAppServerOrchestrator, IAppsRoom, IAppsLivechatRoom, IAppsMessage } from '@rocket.chat/apps';
import type { IPreEmailSentContext } from '@rocket.chat/apps-engine/definition/email';
import type { IExternalComponent } from '@rocket.chat/apps-engine/definition/externalComponent';
import { LivechatTransferEventType } from '@rocket.chat/apps-engine/definition/livechat';
import { isLivechatRoom } from '@rocket.chat/apps-engine/definition/livechat/ILivechatRoom';
import { AppInterface } from '@rocket.chat/apps-engine/definition/metadata';
import type { UIKitIncomingInteraction } from '@rocket.chat/apps-engine/definition/uikit';
import type { IUIKitLivechatIncomingInteraction } from '@rocket.chat/apps-engine/definition/uikit/livechat';
import type { IUserContext, IUserUpdateContext } from '@rocket.chat/apps-engine/definition/users';
import type { IMessage, IRoom, IUser, ILivechatDepartment, IUpload } from '@rocket.chat/core-typings';

type LivechatTransferData = {
	type: LivechatTransferEventType;
	room: string;
	from: string;
	to: string;
};

type LivechatAgentData = {
	room: IRoom;
	user: IUser;
};

type UserStatusChangedData = {
	user: IUser;
	currentStatus: string;
	previousStatus: string;
};

type UserCrudData = {
	user: IUser;
	performedBy?: IUser;
	previousUser?: IUser;
};

// IPostMessageSentToBot is an internally triggered event, based on IPostMessageSent
// so we don't add it here
type HandleMessageEvent =
	| {
			event: AppInterface.IPostMessageDeleted;
			payload: [IMessage, IUser];
	  }
	| {
			event: AppInterface.IPostMessageReacted;
			payload: [IMessage, IUser, string, boolean];
	  }
	| {
			event: AppInterface.IPostMessageFollowed;
			payload: [IMessage, IUser, boolean];
	  }
	| {
			event: AppInterface.IPostMessagePinned;
			payload: [IMessage, IUser, boolean];
	  }
	| {
			event: AppInterface.IPostMessageStarred;
			payload: [IMessage, IUser, boolean];
	  }
	| {
			event: AppInterface.IPostMessageReported;
			payload: [IMessage, IUser, string];
	  }
	| {
			event:
				| AppInterface.IPostSystemMessageSent
				| AppInterface.IPreMessageSentPrevent
				| AppInterface.IPreMessageSentExtend
				| AppInterface.IPreMessageSentModify
				| AppInterface.IPostMessageSent
				| AppInterface.IPreMessageDeletePrevent
				| AppInterface.IPreMessageUpdatedPrevent
				| AppInterface.IPreMessageUpdatedExtend
				| AppInterface.IPreMessageUpdatedModify
				| AppInterface.IPostMessageUpdated;
			payload: [IMessage];
	  };

type HandleRoomEvent =
	| {
			event: AppInterface.IPreRoomUserJoined | AppInterface.IPostRoomUserJoined;
			payload: [IRoom, IUser, IUser];
	  }
	| {
			event: AppInterface.IPreRoomUserLeave | AppInterface.IPostRoomUserLeave;
			payload: [IRoom, IUser, IUser];
	  }
	| {
			event:
				| AppInterface.IPreRoomCreatePrevent
				| AppInterface.IPreRoomCreateExtend
				| AppInterface.IPreRoomCreateModify
				| AppInterface.IPostRoomCreate
				| AppInterface.IPreRoomDeletePrevent
				| AppInterface.IPostRoomDeleted
				| AppInterface.IPreRoomUserJoined
				| AppInterface.IPostRoomUserJoined
				| AppInterface.IPreRoomUserLeave
				| AppInterface.IPostRoomUserLeave;
			payload: [IRoom];
	  };

type HandleLivechatEvent =
	| {
			event: AppInterface.IPostLivechatAgentAssigned | AppInterface.IPostLivechatAgentUnassigned;
			payload: [LivechatAgentData];
	  }
	| {
			event: AppInterface.IPostLivechatRoomTransferred;
			payload: [LivechatTransferData];
	  }
	| {
			event: AppInterface.IPostLivechatGuestSaved;
			payload: [string];
	  }
	| {
			event: AppInterface.IPostLivechatRoomSaved;
			payload: [string];
	  }
	| {
			event: AppInterface.IPostLivechatDepartmentRemoved;
			payload: [ILivechatDepartment];
	  }
	| {
			event: AppInterface.IPostLivechatDepartmentDisabled;
			payload: [ILivechatDepartment];
	  }
	| {
			event:
				| AppInterface.ILivechatRoomClosedHandler
				| AppInterface.IPreLivechatRoomCreatePrevent
				| AppInterface.IPostLivechatRoomStarted
				| AppInterface.IPostLivechatRoomClosed;
			payload: [IRoom];
	  };

type HandleUserEvent =
	| {
			event: AppInterface.IPostUserLoggedIn | AppInterface.IPostUserLoggedOut;
			payload: [IUser];
	  }
	| {
			event: AppInterface.IPostUserStatusChanged;
			payload: [UserStatusChangedData];
	  }
	| {
			event: AppInterface.IPostUserDeleted | AppInterface.IPostUserCreated | AppInterface.IPostUserUpdated;
			payload: [UserCrudData];
	  };

type HandleDefaultEvent =
	| {
			event: AppInterface.IPostExternalComponentOpened | AppInterface.IPostExternalComponentClosed;
			payload: [IExternalComponent];
	  }
	| {
			event: AppInterface.IUIKitInteractionHandler;
			payload: [UIKitIncomingInteraction];
	  }
	| {
			event: AppInterface.IUIKitLivechatInteractionHandler;
			payload: [IUIKitLivechatIncomingInteraction];
	  }
	| {
			event: AppInterface.IPreEmailSent;
			payload: [IPreEmailSentContext];
	  };

type HandleFileUploadEvent = {
	event: AppInterface.IPreFileUpload;
	payload: [{ file: IUpload; content: Buffer | string }];
};

type HandleEvent =
	| HandleMessageEvent
	| HandleRoomEvent
	| HandleLivechatEvent
	| HandleUserEvent
	| HandleFileUploadEvent
	| HandleDefaultEvent;

export class AppListenerBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	// eslint-disable-next-line complexity
	async handleEvent(args: HandleEvent): Promise<any> {
        /* Implementation Hidden */
    }

	async defaultEvent(args: HandleDefaultEvent): Promise<unknown> {
        /* Implementation Hidden */
    }

	async uploadEvent(args: HandleFileUploadEvent): Promise<void> {
        /* Implementation Hidden */
    }

	async messageEvent(args: HandleMessageEvent): Promise<boolean | IMessage | undefined> {
        /* Implementation Hidden */
    }

	async roomEvent(args: HandleRoomEvent): Promise<boolean | IRoom | IAppsRoom | IAppsLivechatRoom | undefined> {
        /* Implementation Hidden */
    }

	async livechatEvent(args: HandleLivechatEvent): Promise<unknown> {
        /* Implementation Hidden */
    }

	async userEvent(args: HandleUserEvent): Promise<unknown> {
        /* Implementation Hidden */
    }
}

```