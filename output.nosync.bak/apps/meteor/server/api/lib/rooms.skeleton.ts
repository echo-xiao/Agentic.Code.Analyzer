## File: apps/meteor/server/api/lib/rooms.ts

```typescript
import type { IRoom, IRoomAbacRedaction, ISubscription, RoomAdminFieldsType, RoomType } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions } from '@rocket.chat/models';
import type { FindOptions, Sort } from 'mongodb';

import { scopeAdminRoomsForAbac } from './scopeAdminRoomsForAbac';
import { stripABACManagedFieldsForAdmin } from '../../../app/authorization/server/lib/isABACManagedRoom';
import { adminFields } from '../../../lib/rooms/adminFields';
import { hasAtLeastOnePermissionAsync, hasPermissionAsync } from '../../lib/authorization/hasPermission';

export async function findAdminRooms({
	uid,
	filter,
	types = [],
	pagination: { offset, count, sort },
}: {
	uid: string;
	filter: string;
	types: Array<RoomType | 'discussions' | 'teams'>;
	pagination: { offset: number; count: number; sort: Sort };
}): Promise<{
	rooms: Array<Pick<IRoom, RoomAdminFieldsType> & IRoomAbacRedaction>;
	count: number;
	offset: number;
	total: number;
}> {
    /* Implementation Hidden */
}

export async function findAdminRoom({
	uid,
	rid,
}: {
	uid: string;
	rid: string;
}): Promise<(Pick<IRoom, RoomAdminFieldsType> & IRoomAbacRedaction) | null> {
    /* Implementation Hidden */
}

export async function findChannelAndPrivateAutocomplete({ uid, selector }: { uid: string; selector: { name: string } }): Promise<{
	items: IRoom[];
}> {
    /* Implementation Hidden */
}

export async function findAdminRoomsAutocomplete({ uid, selector }: { uid: string; selector: { name: string } }): Promise<{
	items: IRoom[];
}> {
    /* Implementation Hidden */
}

export async function findChannelAndPrivateAutocompleteWithPagination({
	uid,
	selector,
	pagination: { offset, count, sort },
}: {
	uid: string;
	selector: { name: string };
	pagination: { offset: number; count: number; sort: Sort };
}): Promise<{
	items: IRoom[];
	total: number;
}> {
    /* Implementation Hidden */
}

export async function findRoomsAvailableForTeams({ uid, name }: { uid: string; name?: string }): Promise<{
	items: IRoom[];
}> {
    /* Implementation Hidden */
}

```