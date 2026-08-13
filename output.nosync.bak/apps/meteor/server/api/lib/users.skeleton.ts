## File: apps/meteor/server/api/lib/users.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users, Subscriptions } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Mongo } from 'meteor/mongo';
import type { Filter, FindOptions, RootFilterOperators } from 'mongodb';

import { settings } from '../../../app/settings/server';
import { hasPermissionAsync } from '../../lib/authorization/hasPermission';

type UserAutoComplete = Required<Pick<IUser, '_id' | 'name' | 'username' | 'nickname' | 'status' | 'avatarETag'>>;

export async function findUsersToAutocomplete({
	uid,
	selector,
}: {
	uid: string;
	selector: { exceptions: Required<IUser>['username'][]; conditions: Filter<IUser>; term: string };
}): Promise<{
	items: UserAutoComplete[];
}> {
    /* Implementation Hidden */
}

/**
 * Returns a new query object with the inclusive fields only
 */
export function getInclusiveFields(query: Record<string, 1 | 0>): Record<string, 1> {
    /* Implementation Hidden */
}

/**
 * get the default fields if **fields** are empty (`{}`) or `undefined`/`null`
 * @param fields the fields from parsed jsonQuery
 */
export function getNonEmptyFields(fields: Record<string, 1 | 0>): Record<string, 1 | 0> {
    /* Implementation Hidden */
}

/**
 * get the default query if **query** is empty (`{}`) or `undefined`/`null`
 * @param query the query from parsed jsonQuery
 */
export function getNonEmptyQuery<T extends IUser>(query: Mongo.Query<T> | undefined | null, canSeeAllUserInfo?: boolean): Mongo.Query<T> {
    /* Implementation Hidden */
}

type FindPaginatedUsersByStatusProps = {
	uid: string;
	offset: number;
	count: number;
	sort: Record<string, 1 | -1>;
	status?: 'active' | 'deactivated';
	roles?: string[] | null;
	searchTerm?: string;
	hasLoggedIn?: boolean;
	type?: string;
	inactiveReason?: ('deactivated' | 'pending_approval' | 'idle_too_long')[];
};

export async function findPaginatedUsersByStatus({
	uid,
	offset,
	count,
	sort,
	status,
	roles,
	searchTerm,
	hasLoggedIn,
	type,
	inactiveReason,
}: FindPaginatedUsersByStatusProps) {
    /* Implementation Hidden */
}

```