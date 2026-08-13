## File: packages/apps/src/server/accessors/RoomBuilder.ts

```typescript
import type { IRoomBuilder } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import type { IRoom, RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

export class RoomBuilder implements IRoomBuilder {
	public kind: RocketChatAssociationModel.ROOM | RocketChatAssociationModel.DISCUSSION;

	protected room: IRoom;

	private members: Array<string>;

	constructor(data?: Partial<IRoom>) {
        /* Implementation Hidden */
    }

	public setData(data: Partial<IRoom>): IRoomBuilder {
        /* Implementation Hidden */
    }

	public setDisplayName(name: string): IRoomBuilder {
        /* Implementation Hidden */
    }

	public getDisplayName(): string {
        /* Implementation Hidden */
    }

	public setSlugifiedName(name: string): IRoomBuilder {
        /* Implementation Hidden */
    }

	public getSlugifiedName(): string {
        /* Implementation Hidden */
    }

	public setType(type: RoomType): IRoomBuilder {
        /* Implementation Hidden */
    }

	public getType(): RoomType {
        /* Implementation Hidden */
    }

	public setCreator(creator: IUser): IRoomBuilder {
        /* Implementation Hidden */
    }

	public getCreator(): IUser {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated
	 */
	public addUsername(username: string): IRoomBuilder {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated
	 */
	public setUsernames(usernames: Array<string>): IRoomBuilder {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated
	 */
	public getUsernames(): Array<string> {
        /* Implementation Hidden */
    }

	public addMemberToBeAddedByUsername(username: string): IRoomBuilder {
        /* Implementation Hidden */
    }

	public setMembersToBeAddedByUsernames(usernames: Array<string>): IRoomBuilder {
        /* Implementation Hidden */
    }

	public getMembersToBeAddedUsernames(): Array<string> {
        /* Implementation Hidden */
    }

	public setDefault(isDefault: boolean): IRoomBuilder {
        /* Implementation Hidden */
    }

	public getIsDefault(): boolean {
        /* Implementation Hidden */
    }

	public setReadOnly(isReadOnly: boolean): IRoomBuilder {
        /* Implementation Hidden */
    }

	public getIsReadOnly(): boolean {
        /* Implementation Hidden */
    }

	public setDisplayingOfSystemMessages(displaySystemMessages: boolean): IRoomBuilder {
        /* Implementation Hidden */
    }

	public getDisplayingOfSystemMessages(): boolean {
        /* Implementation Hidden */
    }

	public addCustomField(key: string, value: object): IRoomBuilder {
        /* Implementation Hidden */
    }

	public setCustomFields(fields: { [key: string]: object }): IRoomBuilder {
        /* Implementation Hidden */
    }

	public getCustomFields(): { [key: string]: object } {
        /* Implementation Hidden */
    }

	public getUserIds(): Array<string> {
        /* Implementation Hidden */
    }

	public getRoom(): IRoom {
        /* Implementation Hidden */
    }
}

```