## File: packages/apps/src/server/bridges/MessageBridge.ts

```typescript
import type { ITypingOptions } from '@rocket.chat/apps-engine/definition/accessors/INotifier';
import type { IMessage, Reaction } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export interface ITypingDescriptor extends ITypingOptions {
	isTyping: boolean;
}

export abstract class MessageBridge extends BaseBridge {
	public async doCreate(message: IMessage, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public async doUpdate(message: IMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doNotifyUser(user: IUser, message: IMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doNotifyRoom(room: IRoom, message: IMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doTyping(options: ITypingDescriptor, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doGetById(messageId: string, appId: string): Promise<IMessage> {
        /* Implementation Hidden */
    }

	public async doDelete(message: IMessage, user: IUser, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doAddReaction(messageId: string, userId: string, reaction: Reaction, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doRemoveReaction(messageId: string, userId: string, reaction: Reaction, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract create(message: IMessage, appId: string): Promise<string>;

	protected abstract update(message: IMessage, appId: string): Promise<void>;

	protected abstract notifyUser(user: IUser, message: IMessage, appId: string): Promise<void>;

	protected abstract notifyRoom(room: IRoom, message: IMessage, appId: string): Promise<void>;

	protected abstract typing(options: ITypingDescriptor, appId: string): Promise<void>;

	protected abstract getById(messageId: string, appId: string): Promise<IMessage>;

	protected abstract delete(message: IMessage, user: IUser, appId: string): Promise<void>;

	protected abstract addReaction(messageId: string, userId: string, reaction: Reaction): Promise<void>;

	protected abstract removeReaction(messageId: string, userId: string, reaction: Reaction): Promise<void>;

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```