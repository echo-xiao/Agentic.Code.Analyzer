## File: ee/packages/federation-matrix/src/events/member.ts

```typescript
import { Room, Upload } from '@rocket.chat/core-services';
import { isBannedSubscription, isRegisterUser } from '@rocket.chat/core-typings';
import type { IRoomNativeFederated, IRoom, IUser, RoomType } from '@rocket.chat/core-typings';
import { federationSDK, type HomeserverEventSignatures, type PduForType } from '@rocket.chat/federation-sdk';
import { Logger } from '@rocket.chat/logger';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';
import debounce from 'lodash.debounce';
import mem from 'mem';

import { createOrUpdateFederatedUser } from '../helpers/createOrUpdateFederatedUser';
import { extractDomainFromMatrixUserId } from '../helpers/extractDomainFromMatrixUserId';
import { getUsernameServername } from '../helpers/getUsernameServername';
import { MatrixMediaService } from '../services/MatrixMediaService';

const logger = new Logger('federation-matrix:member');

async function downloadAndSetAvatar(user: IUser, avatarUrl: string | null): Promise<void> {
    /* Implementation Hidden */
}

async function getOrCreateFederatedUser(userId: string): Promise<IUser> {
    /* Implementation Hidden */
}

async function getOrCreateFederatedRoom({
	matrixRoomId,
	roomName,
	roomFName,
	roomType,
	inviterUserId,
	inviterUsername,
	inviteeUsername,
}: {
	matrixRoomId: string;
	roomName: string;
	roomFName: string;
	roomType: RoomType;
	inviterUserId: string;
	inviterUsername: string;
	inviteeUsername?: string;
}): Promise<IRoom> {
    /* Implementation Hidden */
}

// get the join rule type from the stripped state stored in the unsigned section of the event
// as per the spec, we must support several types but we only support invite and public for now.
// in the future, we must start looking into 'knock', 'knock_restricted', 'restricted' and 'private'.
function getJoinRuleType(strippedState: PduForType<'m.room.join_rules'>[]): 'p' | 'c' | 'd' {
    /* Implementation Hidden */
}

async function handleInvite({
	sender: senderId,
	state_key: userId,
	room_id: roomId,
	content,
	unsigned,
}: HomeserverEventSignatures['homeserver.matrix.membership']['event']): Promise<void> {
    /* Implementation Hidden */
}

const getUpdateUserNameDebounced = mem((userId: string) => debounce((name: string) => Users.setName(userId, name), 1000));

function updateUserNameDebounced(userId: string, newName: string): void {
    /* Implementation Hidden */
}

const getDownloadAndSetAvatarDebounced = mem((_userId: string) =>
	debounce((user: IUser, avatarUrl: string | null) => downloadAndSetAvatar(user, avatarUrl), 2000),
);

function downloadAndSetAvatarDebounced(userId: string, user: IUser, newAvatarUrl: string | null): void {
    /* Implementation Hidden */
}

async function handleJoin({
	room_id: roomId,
	state_key: userId,
	content,
}: HomeserverEventSignatures['homeserver.matrix.membership']['event']): Promise<void> {
    /* Implementation Hidden */
}

async function handleLeave({
	room_id: roomId,
	state_key: userId,
	sender,
	unsigned: { prev_content: prevContent },
}: HomeserverEventSignatures['homeserver.matrix.membership']['event']): Promise<void> {
    /* Implementation Hidden */
}

async function handleBan({
	room_id: roomId,
	state_key: userId,
	sender: senderId,
}: HomeserverEventSignatures['homeserver.matrix.membership']['event']): Promise<void> {
    /* Implementation Hidden */
}

async function handleMembershipRejected({
	event,
	reason,
}: HomeserverEventSignatures['homeserver.matrix.membership.rejected']): Promise<void> {
    /* Implementation Hidden */
}

export function member() {
    /* Implementation Hidden */
}

```