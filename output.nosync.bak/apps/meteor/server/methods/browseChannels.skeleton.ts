## File: apps/meteor/server/methods/browseChannels.ts

```typescript
import { Team } from '@rocket.chat/core-services';
import type { IUser, AtLeast } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Rooms, Users, Subscriptions } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { isTruthy } from '@rocket.chat/tools';
import mem from 'mem';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Meteor } from 'meteor/meteor';
import type { FindOptions, SortDirection } from 'mongodb';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { settings } from '../../app/settings/server';
import { trim } from '../../lib/utils/stringUtils';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';

const sortChannels = (field: string, direction: 'asc' | 'desc'): Record<string, 1 | -1> => {
    /* Implementation Hidden */
};

const sortUsers = (field: string, direction: 'asc' | 'desc'): Record<string, SortDirection> => {
    /* Implementation Hidden */
};

const getChannelsAndGroups = async (
	user: AtLeast<IUser, '_id' | '__rooms'>,
	canViewAnon: boolean,
	searchTerm: string,
	sort: Record<string, number>,
	pagination: {
		skip: number;
		limit: number;
	},
) => {
    /* Implementation Hidden */
};

const getChannelsCountForTeam = mem((teamId) => Rooms.countByTeamId(teamId), {
	maxAge: 2000,
});

const getTeams = async (
	user: AtLeast<IUser, '_id' | '__rooms'>,
	searchTerm: string,
	sort: Record<string, number>,
	pagination: {
		skip: number;
		limit: number;
	},
) => {
    /* Implementation Hidden */
};

const findUsers = async ({
	text,
	sort,
	pagination,
	workspace,
	viewFullOtherUserInfo,
}: {
	text: string;
	sort: Record<string, SortDirection>;
	pagination: {
		skip: number;
		limit: number;
	};
	workspace: string;
	viewFullOtherUserInfo: boolean;
}) => {
    /* Implementation Hidden */
};

const getUsers = async (
	user: AtLeast<IUser, '_id' | '__rooms'> | undefined,
	text: string,
	workspace: string,
	sort: Record<string, SortDirection>,
	pagination: {
		skip: number;
		limit: number;
	},
) => {
    /* Implementation Hidden */
};

type BrowseChannelsParams = {
	text?: string;
	workspace?: string;
	type?: 'channels' | 'users' | 'teams' | string;
	sortBy?: 'name' | 'createdAt' | 'usersCount' | 'lastMessage' | 'usernames' | string;
	sortDirection?: 'asc' | 'desc';
	page?: number;
	offset?: number;
	limit?: number;
};

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		browseChannels: (params: BrowseChannelsParams) => Promise<unknown>;
	}
}

export const browseChannelsMethod = async (
	{
		text = '',
		workspace = '',
		type = 'channels',
		sortBy = 'name',
		sortDirection = 'asc',
		page = 0,
		offset = 0,
		limit = 10,
	}: BrowseChannelsParams,
	user: AtLeast<IUser, '_id' | '__rooms'> | undefined | null,
) => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async browseChannels(params: BrowseChannelsParams) {
		methodDeprecationLogger.method('browseChannels', '9.0.0', '/v1/directory');
		return browseChannelsMethod(params, (await Meteor.userAsync()) as IUser | null);
	},
});

DDPRateLimiter.addRule(
	{
		type: 'method',
		name: 'browseChannels',
		userId(/* userId*/) {
			return true;
		},
	},
	100,
	100000,
);

```