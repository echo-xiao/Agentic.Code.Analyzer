## File: apps/meteor/server/services/room/service.ts

```typescript
import { ServiceClassInternal, Authorization, Message, MeteorError, FederationMatrix } from '@rocket.chat/core-services';
import type { ICreateRoomParams, IRoomService } from '@rocket.chat/core-services';
import {
	type AtLeast,
	type IRoom,
	type IUser,
	type MessageTypesValues,
	type ISubscription,
	isOmnichannelRoom,
	isRoomWithJoinCode,
} from '@rocket.chat/core-typings';
import { isUserNativeFederated } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';

import { getNameForDMs } from './getNameForDMs';
import { FederationActions } from './hooks/BeforeFederationActions';
import { saveRoomName } from '../../../app/channel-settings/server';
import { saveRoomTopic } from '../../../app/channel-settings/server/functions/saveRoomTopic';
import {
	notifyOnSubscriptionChanged,
	notifyOnSubscriptionChangedById,
	notifyOnSubscriptionChangedByRoomIdAndUserId,
} from '../../../app/lib/server/lib/notifyListener';
import { readThread } from '../../../app/threads/server/functions';
import { getDefaultSubscriptionPref } from '../../../app/utils/lib/getDefaultSubscriptionPref';
import { getValidRoomName } from '../../../app/utils/server/lib/getValidRoomName';
import { RoomMemberActions } from '../../../definition/IRoomTypeConfig';
import { getSubscriptionAutotranslateDefaultConfig } from '../../lib/getSubscriptionAutotranslateDefaultConfig';
import { readMessages } from '../../lib/readMessages';
import { performAcceptRoomInvite } from '../../lib/rooms/acceptRoomInvite';
import { addUserToRoom } from '../../lib/rooms/addUserToRoom';
import { performUserBan } from '../../lib/rooms/banUserFromRoom';
import { createRoom } from '../../lib/rooms/createRoom'; // TODO remove this import
import { executeUnbanUserFromRoom } from '../../lib/rooms/executeUnbanUserFromRoom';
import { removeUserFromRoom, performUserRemoval } from '../../lib/rooms/removeUserFromRoom';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';
import { addRoomLeader } from '../../methods/addRoomLeader';
import { addRoomModerator } from '../../methods/addRoomModerator';
import { addRoomOwner } from '../../methods/addRoomOwner';
import { createDirectMessage } from '../../methods/createDirectMessage';
import { removeRoomLeader } from '../../methods/removeRoomLeader';
import { removeRoomModerator } from '../../methods/removeRoomModerator';
import { removeRoomOwner } from '../../methods/removeRoomOwner';

export class RoomService extends ServiceClassInternal implements IRoomService {
	protected name = 'room';

	async updateDirectMessageRoomName(
		room: IRoom,
		ignoreStatusFromSubs?: string[],
		updatedNames?: AtLeast<IUser, '_id' | 'name' | 'username'>[],
	): Promise<boolean> {
        /* Implementation Hidden */
    }

	async create(uid: string, params: ICreateRoomParams): Promise<IRoom> {
        /* Implementation Hidden */
    }

	async createDirectMessage({ to, from }: { to: string; from: string }): Promise<{ rid: string }> {
        /* Implementation Hidden */
    }

	async createDirectMessageWithMultipleUsers(members: string[], creatorId: string): Promise<{ rid: string }> {
        /* Implementation Hidden */
    }

	async addMember(uid: string, rid: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async addUserToRoom(
		roomId: string,
		user: Pick<IUser, '_id'>,
		inviter?: Pick<IUser, '_id' | 'username'>,
		options?: {
			skipSystemMessage?: boolean;
			skipAlertSound?: boolean;
		},
	): Promise<boolean | undefined> {
        /* Implementation Hidden */
    }

	async removeUserFromRoom(
		roomId: string,
		user: IUser,
		options?: { byUser?: IUser; skipAppPreEvents?: boolean; customSystemMessage?: MessageTypesValues },
	): Promise<void> {
        /* Implementation Hidden */
    }

	async performUserRemoval(room: IRoom, user: IUser, options?: { byUser?: IUser }): Promise<void> {
        /* Implementation Hidden */
    }

	async performUserBan(room: IRoom, user: IUser, byUser: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async performUserUnban(room: IRoom, user: IUser, byUser: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async performAcceptRoomInvite(room: IRoom, subscription: ISubscription, user: IUser & { username: string }): Promise<void> {
        /* Implementation Hidden */
    }

	async revokeInvite(room: IRoom, user: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async getValidRoomName(displayName: string, roomId = '', options: { allowDuplicates?: boolean } = {}): Promise<string> {
        /* Implementation Hidden */
    }

	async saveRoomTopic(
		roomId: string,
		roomTopic: string | undefined,
		user: Pick<IUser, 'username' | '_id' | 'federation' | 'federated'>,
		sendMessage = true,
	): Promise<void> {
        /* Implementation Hidden */
    }

	async getRouteLink(room: AtLeast<IRoom, '_id' | 't' | 'name'>): Promise<string | boolean> {
        /* Implementation Hidden */
    }

	/**
	 * Method called by users to join a room.
	 */
	async join({ room, user, joinCode }: { room: IRoom; user: IUser; joinCode?: string }) {
        /* Implementation Hidden */
    }

	async beforeLeave(room: IRoom): Promise<void> {
        /* Implementation Hidden */
    }

	async beforeUserRemoved(room: IRoom): Promise<void> {
        /* Implementation Hidden */
    }

	async beforeNameChange(room: IRoom): Promise<void> {
        /* Implementation Hidden */
    }

	async beforeTopicChange(room: IRoom): Promise<void> {
        /* Implementation Hidden */
    }

	async saveRoomName(roomId: string, userId: string, name: string) {
        /* Implementation Hidden */
    }

	public async addUserRoleRoomScoped(
		fromUserId: string,
		userId: string,
		roomId: string,
		role: 'moderator' | 'owner' | 'leader' | 'user',
	): Promise<void> {
        /* Implementation Hidden */
    }

	async createUserSubscription({
		room,
		ts,
		userToBeAdded,
		inviter,
		createAsHidden = false,
		skipAlertSound = false,
		skipSystemMessage = false,
		status,
		roles,
	}: {
		room: IRoom;
		ts: Date;
		userToBeAdded: IUser;
		inviter?: Pick<IUser, '_id' | 'username' | 'name'>;
		createAsHidden?: boolean;
		skipAlertSound?: boolean;
		skipSystemMessage?: boolean;
		status?: 'INVITED';
		roles?: ISubscription['roles'];
	}): Promise<string | undefined> {
        /* Implementation Hidden */
    }

	async markAsRead(room: IRoom, userId: string, readThreads = false): Promise<void> {
        /* Implementation Hidden */
    }

	async readThread({ user, room, tmid }: { user: IUser; room: IRoom; tmid: string }): Promise<void> {
        /* Implementation Hidden */
    }

	async unbanAndInviteUser(
		subscription: ISubscription,
		inviteeUser: Pick<IUser, '_id' | 'username' | 'name'>,
		inviterUser: Required<Pick<IUser, '_id' | 'username'>> & Pick<IUser, 'name'>,
	): Promise<void> {
        /* Implementation Hidden */
    }
}

```