## File: apps/meteor/tests/data/rooms.helper.ts

```typescript
import type { Credentials } from '@rocket.chat/api-client';
import type { IRoom, ISubscription, IUser, IMessage } from '@rocket.chat/core-typings';
import type { Endpoints } from '@rocket.chat/rest-typings';

import { api, credentials, methodCall, request } from './api-data';
import type { IRequestConfig } from './users.helper';

type CreateRoomParams = {
	name?: IRoom['name'];
	type: IRoom['t'];
	username?: string;
	members?: string[];
	credentials?: Credentials;
	readOnly?: boolean;
	extraData?: Record<string, any>;
	config?: IRequestConfig;
};

export const createRoom = ({
	name,
	type,
	username,
	members,
	credentials: customCredentials,
	extraData,
	readOnly,
	config,
}: CreateRoomParams) => {
    /* Implementation Hidden */
};

type ActionType = 'delete' | 'close' | 'addOwner' | 'removeOwner';
export type ActionRoomParams = {
	action: ActionType;
	type: Exclude<IRoom['t'], 'l'>;
	roomId: IRoom['_id'];
	overrideCredentials?: Credentials;
	extraData?: Record<string, any>;
};

export function actionRoom({ action, type, roomId, overrideCredentials = credentials, extraData = {} }: ActionRoomParams) {
    /* Implementation Hidden */
}

export const deleteRoom = ({ type, roomId }: { type: ActionRoomParams['type']; roomId: IRoom['_id'] }) =>
	actionRoom({ action: 'delete', type, roomId, overrideCredentials: credentials });

export const getSubscriptionByRoomId = (roomId: IRoom['_id'], userCredentials = credentials, req = request): Promise<ISubscription> =>
	new Promise((resolve, reject) => {
		void req
			.get(api('subscriptions.getOne'))
			.set(userCredentials)
			.query({ roomId })
			.end((err, res) => {
				if (err) {
					return reject(err);
				}
				if (!res.body?.subscription) {
					return reject(new Error('Subscription not found'));
				}

				resolve(res.body.subscription);
			});
	});

/**
 * Adds users to a room using the REST invite endpoints (channels.invite / groups.invite).
 *
 * This is the entrypoint the "Add users" UI uses. Supports both local and federated users.
 * The REST endpoints accept a single invitee per call, so this issues one request per
 * username (mirroring how the UI fans out the invites) and resolves to the array of responses.
 *
 * @param usernames - Array of usernames to add to the room
 * @param rid - The unique identifier of the room
 * @param type - Room type, selects the endpoint: 'c' -> channels.invite, 'p' -> groups.invite
 * @param userCredentials - Optional credentials for the request (deprecated, use config instead)
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to the array of REST invite responses (one per username)
 */
export const addUserToRoom = ({
	usernames,
	rid,
	type = 'c',
	userCredentials,
	config,
}: {
	usernames: string[];
	rid: IRoom['_id'];
	type?: 'c' | 'p';
	userCredentials?: Credentials;
	config?: IRequestConfig;
}) => {
    /* Implementation Hidden */
};

/**
 * Adds users to a room using the deprecated `addUsersToRoom` DDP method.
 *
 * The method is deprecated in favour of the REST invite endpoints (see {@link addUserToRoom}),
 * but it is still a supported entrypoint. Prefer the REST helper for general test setup — this
 * helper exists to keep dedicated coverage of the DDP-method entrypoint (e.g. federation invites).
 *
 * @param usernames - Array of usernames to add to the room
 * @param rid - The unique identifier of the room
 * @param userCredentials - Optional credentials for the request (deprecated, use config instead)
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to the method call response
 */
export const addUserToRoomViaMethod = ({
	usernames,
	rid,
	userCredentials,
	config,
}: {
	usernames: string[];
	rid: IRoom['_id'];
	userCredentials?: Credentials;
	config?: IRequestConfig;
}) => {
    /* Implementation Hidden */
};

/**
 * Adds users to a room using the /invite slash command via method.call.
 *
 * Executes the /invite slash command using the DDP method call to add users to a room.
 * This simulates the user experience of using slash commands in the UI.
 * Supports both local and federated users, with proper error handling for federation restrictions.
 *
 * @param usernames - Array of usernames to add to the room
 * @param rid - The unique identifier of the room
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to the method call response
 * @note The slash command expects parameters: { cmd: string, params: string, msg: IMessage, triggerId: string }
 */
// TODO(ddp-removal): swap /api/v1/method.call/slashCommand for
// POST /v1/commands.run. Same caveat as addUserToRoom: federation specs
// inspect the DDP-style `message` payload and need to be ported to the
// REST envelope first.
export const addUserToRoomSlashCommand = ({
	usernames,
	rid,
	config,
}: {
	usernames: string[];
	rid: IRoom['_id'];
	config?: IRequestConfig;
}) => {
    /* Implementation Hidden */
};

/**
 * Retrieves detailed information about a room.
 *
 * Fetches comprehensive room metadata including federation status,
 * member counts, and other room properties needed for federation testing.
 *
 * @param roomId - The unique identifier of the room
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to room information response
 */
export const getRoomInfo = (roomId: IRoom['_id'], config?: IRequestConfig) => {
    /* Implementation Hidden */
};

/**
 * Retrieves room members ordered by their role hierarchy.
 *
 * Gets the complete list of room members with their roles and permissions,
 * ordered by importance. Essential for verifying federation member synchronization
 * and role assignments across different Rocket.Chat instances.
 *
 * @param roomId - The unique identifier of the room
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to ordered member list response
 */
export const getRoomMembers = (roomId: IRoom['_id'], config?: IRequestConfig) => {
    /* Implementation Hidden */
};

/**
 * Finds a specific room member with configurable retry logic.
 *
 * Searches for a member in a room by username, with retry logic to handle
 * eventual consistency in federated systems. This is crucial for federation
 * testing where member synchronization may take time to propagate.
 *
 * @param roomId - The unique identifier of the room to search
 * @param username - The username to find
 * @param options - Retry configuration options
 * @param options.maxRetries - Maximum number of retry attempts (default: 3)
 * @param options.delay - Delay between retries in milliseconds (default: 1000)
 * @param options.initialDelay - Initial delay before first attempt in milliseconds (default: 0)
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to the user object if found, null otherwise
 */
export const findRoomMember = async (
	roomId: IRoom['_id'],
	username: string,
	options: { maxRetries?: number; delay?: number; initialDelay?: number } = {},
	config?: IRequestConfig,
): Promise<IUser | null> => {
    /* Implementation Hidden */
};

/**
 * Retrieves the message history for a group/private room.
 *
 * Fetches the complete message history including system messages,
 * user messages, and federation events. Essential for verifying
 * message synchronization and system message generation in federated rooms.
 *
 * @param roomId - The unique identifier of the room
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to message history response
 */
export const getGroupHistory = (roomId: IRoom['_id'], config?: IRequestConfig) => {
    /* Implementation Hidden */
};

/**
 * Loads message history for a room using the loadHistory method call.
 *
 * Fetches message history via the DDP method call endpoint, which returns
 * messages with markdown parsing metadata (md attribute). This is useful
 * for testing message rendering and markdown parsing, including emoji handling.
 *
 * @param rid - The unique identifier of the room
 * @param config - Optional request configuration for custom domains
 * @param end - Optional end date to load messages before this timestamp
 * @param limit - Optional limit for number of messages to return (default: 20)
 * @param ls - Optional last seen timestamp for unread calculation
 * @param showThreadMessages - Optional flag to include thread messages (default: true)
 * @returns Promise resolving to message history with structure: { messages, firstUnread?, unreadNotLoaded? }
 */
export const loadHistory = async (
	rid: IRoom['_id'],
	config?: IRequestConfig,
	end?: Date,
	limit?: number,
	ls?: string | Date,
	showThreadMessages?: boolean,
) => {
    /* Implementation Hidden */
};

/**
 * Accepts a room invite for the authenticated user.
 *
 * Processes a room invitation by accepting it, which grants the user
 * access to the room. This is essential for federated room workflows
 * where users receive invitations rather than auto-joining.
 *
 * @param roomId - The unique identifier of the room
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to the acceptance response
 */
export const acceptRoomInvite = (roomId: IRoom['_id'], config?: IRequestConfig) => {
    /* Implementation Hidden */
};

/**
 * Retrieves the subscriptions for the authenticated user.
 *
 * Fetches the complete list of subscriptions for the authenticated user, which is essential
 * for verifying federation subscription synchronization and member synchronization.
 *
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to the subscriptions response
 */

export const getSubscriptions = (config?: IRequestConfig) => {
    /* Implementation Hidden */
};

/**
 * Rejects a room invite for the authenticated user.
 *
 * Processes a room invitation by rejecting it, which prevents the user
 * from joining the room and removes them from the invited members list.
 * This is essential for federated room workflows where users can decline invitations.
 *
 * @param roomId - The unique identifier of the room
 * @param config - Optional request configuration for custom domains
 * @returns Promise resolving to the rejection response
 */
export const rejectRoomInvite = (roomId: IRoom['_id'], config?: IRequestConfig) => {
    /* Implementation Hidden */
};

```