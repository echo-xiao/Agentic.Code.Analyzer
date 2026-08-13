## File: packages/apps/src/server/managers/AppListenerManager.ts

```typescript
import type { IEmailDescriptor, IPreEmailSentContext } from '@rocket.chat/apps-engine/definition/email';
import { EssentialAppDisabledException } from '@rocket.chat/apps-engine/definition/exceptions';
import type { IExternalComponent } from '@rocket.chat/apps-engine/definition/externalComponent';
import type {
	ILivechatEventContext,
	ILivechatRoom,
	ILivechatTransferEventContext,
	IVisitor,
} from '@rocket.chat/apps-engine/definition/livechat';
import type { ILivechatDepartmentEventContext } from '@rocket.chat/apps-engine/definition/livechat/ILivechatEventContext';
import type {
	IMessage,
	IMessageDeleteContext,
	IMessageFollowContext,
	IMessagePinContext,
	IMessageReactionContext,
	IMessageReportContext,
	IMessageStarContext,
} from '@rocket.chat/apps-engine/definition/messages';
import { AppInterface, AppMethod } from '@rocket.chat/apps-engine/definition/metadata';
import type { IRoom, IRoomUserJoinedContext, IRoomUserLeaveContext } from '@rocket.chat/apps-engine/definition/rooms';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import { UIActionButtonContext } from '@rocket.chat/apps-engine/definition/ui';
import type { IUIKitResponse, IUIKitSurface, UIKitIncomingInteraction } from '@rocket.chat/apps-engine/definition/uikit';
import { UIKitIncomingInteractionType } from '@rocket.chat/apps-engine/definition/uikit';
import { isUIKitIncomingInteractionActionButtonMessageBox } from '@rocket.chat/apps-engine/definition/uikit/IUIKitIncomingInteractionActionButton';
import type {
	IUIKitLivechatBlockIncomingInteraction,
	IUIKitLivechatIncomingInteraction,
} from '@rocket.chat/apps-engine/definition/uikit/livechat';
import type { IFileUploadInternalContext } from '@rocket.chat/apps-engine/definition/uploads/IFileUploadContext';
import type { IUser, IUserContext, IUserStatusContext, IUserUpdateContext } from '@rocket.chat/apps-engine/definition/users';

import type { AppAccessorManager } from './AppAccessorManager';
import type { AppManager } from '../AppManager';
import type { ProxiedApp } from '../ProxiedApp';
import { Utilities } from '../misc/Utilities';
import { JSONRPC_METHOD_NOT_FOUND } from '../runtime/base/BaseRuntimeSubprocessController';

export interface IListenerExecutor {
	[AppInterface.IPreMessageSentPrevent]: {
		args: [IMessage];
		result: boolean;
	};
	[AppInterface.IPreMessageSentExtend]: {
		args: [IMessage];
		result: IMessage;
	};
	[AppInterface.IPreMessageSentModify]: {
		args: [IMessage];
		result: IMessage;
	};
	[AppInterface.IPostSystemMessageSent]: {
		args: [IMessage];
		result: void;
	};
	[AppInterface.IPostMessageSent]: {
		args: [IMessage];
		result: void;
	};
	[AppInterface.IPreMessageDeletePrevent]: {
		args: [IMessage];
		result: boolean;
	};
	[AppInterface.IPostMessageDeleted]: {
		args: [IMessageDeleteContext];
		result: void;
	};
	[AppInterface.IPreMessageUpdatedPrevent]: {
		args: [IMessage];
		result: unknown;
	};
	[AppInterface.IPreMessageUpdatedExtend]: {
		args: [IMessage];
		result: boolean;
	};
	[AppInterface.IPreMessageUpdatedModify]: {
		args: [IMessage];
		result: IMessage;
	};
	[AppInterface.IPostMessageUpdated]: {
		args: [IMessage];
		result: IMessage;
	};
	[AppInterface.IPostMessageReacted]: {
		args: [IMessageReactionContext];
		result: void;
	};
	[AppInterface.IPostMessageFollowed]: {
		args: [IMessageFollowContext];
		result: void;
	};
	[AppInterface.IPostMessagePinned]: {
		args: [IMessagePinContext];
		result: void;
	};
	[AppInterface.IPostMessageStarred]: {
		args: [IMessageStarContext];
		result: void;
	};
	[AppInterface.IPostMessageReported]: {
		args: [IMessageReportContext];
		result: void;
	};
	// Rooms
	[AppInterface.IPreRoomCreatePrevent]: {
		args: [IRoom];
		result: boolean;
	};
	[AppInterface.IPreRoomCreateExtend]: {
		args: [IRoom];
		result: IRoom;
	};
	[AppInterface.IPreRoomCreateModify]: {
		args: [IRoom];
		result: IRoom;
	};
	[AppInterface.IPostRoomCreate]: {
		args: [IRoom];
		result: void;
	};
	[AppInterface.IPreRoomDeletePrevent]: {
		args: [IRoom];
		result: boolean;
	};
	[AppInterface.IPostRoomDeleted]: {
		args: [IRoom];
		result: void;
	};
	[AppInterface.IPreRoomUserJoined]: {
		args: [IRoomUserJoinedContext];
		result: void;
	};
	[AppInterface.IPostRoomUserJoined]: {
		args: [IRoomUserJoinedContext];
		result: void;
	};
	[AppInterface.IPreRoomUserLeave]: {
		args: [IRoomUserLeaveContext];
		result: void;
	};
	[AppInterface.IPostRoomUserLeave]: {
		args: [IRoomUserLeaveContext];
		result: void;
	};
	// External Components
	[AppInterface.IPostExternalComponentOpened]: {
		args: [IExternalComponent];
		result: void;
	};
	[AppInterface.IPostExternalComponentClosed]: {
		args: [IExternalComponent];
		result: void;
	};
	[AppInterface.IUIKitInteractionHandler]: {
		args: [UIKitIncomingInteraction];
		result: IUIKitResponse;
	};
	[AppInterface.IUIKitLivechatInteractionHandler]: {
		args: [IUIKitLivechatIncomingInteraction];
		result: IUIKitResponse;
	};
	// Livechat
	[AppInterface.IPostLivechatRoomStarted]: {
		args: [ILivechatRoom];
		result: void;
	};
	/**
	 * @deprecated please prefer the AppInterface.IPostLivechatRoomClosed event
	 */
	[AppInterface.ILivechatRoomClosedHandler]: {
		args: [ILivechatRoom];
		result: void;
	};
	[AppInterface.IPreLivechatRoomCreatePrevent]: {
		args: [ILivechatRoom];
		result: void;
	};
	[AppInterface.IPostLivechatRoomClosed]: {
		args: [ILivechatRoom];
		result: void;
	};
	[AppInterface.IPostLivechatRoomSaved]: {
		args: [ILivechatRoom];
		result: void;
	};
	[AppInterface.IPostLivechatAgentAssigned]: {
		args: [ILivechatEventContext];
		result: void;
	};
	[AppInterface.IPostLivechatAgentUnassigned]: {
		args: [ILivechatEventContext];
		result: void;
	};
	[AppInterface.IPostLivechatRoomTransferred]: {
		args: [ILivechatTransferEventContext];
		result: void;
	};
	[AppInterface.IPostLivechatGuestSaved]: {
		args: [IVisitor];
		result: void;
	};
	[AppInterface.IPostLivechatDepartmentRemoved]: {
		args: [ILivechatDepartmentEventContext];
		result: void;
	};
	[AppInterface.IPostLivechatDepartmentDisabled]: {
		args: [ILivechatDepartmentEventContext];
		result: void;
	};
	// FileUpload
	[AppInterface.IPreFileUpload]: {
		args: [IFileUploadInternalContext];
		result: void;
	};
	// Email
	[AppInterface.IPreEmailSent]: {
		args: [IPreEmailSentContext];
		result: IUIKitResponse;
	};
	// User
	[AppInterface.IPostUserCreated]: {
		args: [IUserContext];
		result: void;
	};
	[AppInterface.IPostUserUpdated]: {
		args: [IUserContext];
		result: void;
	};
	[AppInterface.IPostUserDeleted]: {
		args: [IUserContext];
		result: void;
	};
	[AppInterface.IPostUserLoggedIn]: {
		args: [IUser];
		result: void;
	};
	[AppInterface.IPostUserLoggedOut]: {
		args: [IUser];
		result: void;
	};
	[AppInterface.IPostUserStatusChanged]: {
		args: [IUserStatusContext];
		result: void;
	};
}

// type EventReturn = void | boolean | IMessage | IRoom | IUser | IUIKitResponse | ILivechatRoom | IEmailDescriptor;

export class AppListenerManager {
	private am: AppAccessorManager;

	private listeners: Map<string, Array<string>>;

	private defaultHandlers = new Map<string, any>();

	/**
	 * Locked events are those who are listed in an app's
	 * "essentials" list but the app is disabled.
	 *
	 * They will throw a EssentialAppDisabledException upon call
	 */
	private lockedEvents: Map<string, Set<string>>;

	constructor(private readonly manager: AppManager) {
        /* Implementation Hidden */
    }

	public registerListeners(app: ProxiedApp): void {
        /* Implementation Hidden */
    }

	public unregisterListeners(app: ProxiedApp): void {
        /* Implementation Hidden */
    }

	public releaseEssentialEvents(app: ProxiedApp): void {
        /* Implementation Hidden */
    }

	public lockEssentialEvents(app: ProxiedApp): void {
        /* Implementation Hidden */
    }

	public getListeners(int: AppInterface): Array<ProxiedApp> {
        /* Implementation Hidden */
    }

	public isEventBlocked(event: AppInterface): boolean {
        /* Implementation Hidden */
    }

	/* eslint-disable-next-line complexity */
	public async executeListener<I extends keyof IListenerExecutor>(
		int: I,
		data: IListenerExecutor[I]['args'][0],
	): Promise<IListenerExecutor[I]['result']> {
        /* Implementation Hidden */
    }

	// Messages
	private async executePreMessageSentPrevent(data: IMessage): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async executePreMessageSentExtend(data: IMessage): Promise<IMessage> {
        /* Implementation Hidden */
    }

	private async executePreMessageSentModify(data: IMessage): Promise<IMessage> {
        /* Implementation Hidden */
    }

	private async executePostMessageSent(data: IMessage): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostSystemMessageSent(data: IMessage): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePreMessageDeletePrevent(data: IMessage): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async executePostMessageDelete(data: IMessageDeleteContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePreMessageUpdatedPrevent(data: IMessage): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async executePreMessageUpdatedExtend(data: IMessage): Promise<IMessage> {
        /* Implementation Hidden */
    }

	private async executePreMessageUpdatedModify(data: IMessage): Promise<IMessage> {
        /* Implementation Hidden */
    }

	private async executePostMessageUpdated(data: IMessage): Promise<void> {
        /* Implementation Hidden */
    }

	// Rooms
	private async executePreRoomCreatePrevent(data: IRoom): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async executePreRoomCreateExtend(data: IRoom): Promise<IRoom> {
        /* Implementation Hidden */
    }

	private async executePreRoomCreateModify(data: IRoom): Promise<IRoom> {
        /* Implementation Hidden */
    }

	private async executePostRoomCreate(data: IRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePreRoomDeletePrevent(data: IRoom): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async executePostRoomDeleted(data: IRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePreRoomUserJoined(externalData: IRoomUserJoinedContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostRoomUserJoined(externalData: IRoomUserJoinedContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePreRoomUserLeave(externalData: IRoomUserLeaveContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostRoomUserLeave(externalData: IRoomUserLeaveContext): Promise<void> {
        /* Implementation Hidden */
    }

	// External Components
	private async executePostExternalComponentOpened(data: IExternalComponent): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostExternalComponentClosed(data: IExternalComponent): Promise<void> {
        /* Implementation Hidden */
    }

	private async executeUIKitInteraction(data: UIKitIncomingInteraction): Promise<IUIKitResponse> {
        /* Implementation Hidden */
    }

	private async executeUIKitLivechatInteraction(data: IUIKitLivechatIncomingInteraction): Promise<IUIKitResponse> {
        /* Implementation Hidden */
    }

	// Livechat
	private async executePreLivechatRoomCreatePrevent(data: ILivechatRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostLivechatRoomStarted(data: ILivechatRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private async executeLivechatRoomClosedHandler(data: ILivechatRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostLivechatRoomClosed(data: ILivechatRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostLivechatAgentAssigned(data: ILivechatEventContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostLivechatAgentUnassigned(data: ILivechatEventContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostLivechatRoomTransferred(data: ILivechatTransferEventContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostLivechatGuestSaved(data: IVisitor): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostLivechatRoomSaved(data: ILivechatRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostLivechatDepartmentRemoved(data: ILivechatDepartmentEventContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostLivechatDepartmentDisabled(data: ILivechatDepartmentEventContext): Promise<void> {
        /* Implementation Hidden */
    }

	// FileUpload
	private async executePreFileUpload(data: IFileUploadInternalContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePreEmailSent(data: IPreEmailSentContext): Promise<IEmailDescriptor> {
        /* Implementation Hidden */
    }

	private async executePostMessageReacted(data: IMessageReactionContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostMessageFollowed(data: IMessageFollowContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostMessagePinned(data: IMessagePinContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostMessageStarred(data: IMessageStarContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostMessageReported(data: IMessageReportContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostUserCreated(data: IUserContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostUserUpdated(data: IUserUpdateContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostUserDeleted(data: IUserContext): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostUserLoggedIn(data: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostUserLoggedOut(data: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	private async executePostUserStatusChanged(data: IUserStatusContext): Promise<void> {
        /* Implementation Hidden */
    }
}

```