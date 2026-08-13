## File: apps/meteor/ee/server/lib/ldap/Manager.ts

```typescript
import { Abac, Team } from '@rocket.chat/core-services';
import type { ILDAPEntry, IUser, IRoom, IRole, IImportUser, IImportRecord } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { Users, Roles, Subscriptions as SubscriptionsRaw, Rooms } from '@rocket.chat/models';
import type ldapjs from 'ldapjs';
import type { FindCursor } from 'mongodb';

import { copyCustomFieldsLDAP } from './copyCustomFieldsLDAP';
import type {
	ImporterAfterImportCallback,
	ImporterBeforeImportCallback,
} from '../../../../app/importer/server/definitions/IConversionCallbacks';
import { settings } from '../../../../app/settings/server';
import { getValidRoomName } from '../../../../app/utils/server/lib/getValidRoomName';
import { ensureArray } from '../../../../lib/utils/arrayUtils';
import { LDAPConnection } from '../../../../server/lib/ldap/Connection';
import { logger, searchLogger, mapLogger } from '../../../../server/lib/ldap/Logger';
import { LDAPManager } from '../../../../server/lib/ldap/Manager';
import { LDAPUserConverter } from '../../../../server/lib/ldap/UserConverter';
import { addUserToRoom } from '../../../../server/lib/rooms/addUserToRoom';
import { createRoom } from '../../../../server/lib/rooms/createRoom';
import { removeUserFromRoom } from '../../../../server/lib/rooms/removeUserFromRoom';
import { setUserActiveStatus } from '../../../../server/lib/users/setUserActiveStatus';
import { syncUserRoles } from '../syncUserRoles';

export class LDAPEEManager extends LDAPManager {
	public static async sync(): Promise<void> {
        /* Implementation Hidden */
    }

	public static async syncAvatars(): Promise<void> {
        /* Implementation Hidden */
    }

	public static async syncAbacAttributes(): Promise<void> {
        /* Implementation Hidden */
    }

	public static async syncUsersAbacAttributes(users: FindCursor<IUser>): Promise<void> {
        /* Implementation Hidden */
    }

	public static validateLDAPTeamsMappingChanges(json: string): void {
        /* Implementation Hidden */
    }

	public static validateLDAPABACAttributeMap(json: string): void {
        /* Implementation Hidden */
    }

	public static async syncAvatarAndAbacAttributes(): Promise<void> {
        /* Implementation Hidden */
    }

	public static async syncLogout(): Promise<void> {
        /* Implementation Hidden */
    }

	public static async advancedSyncForUser(ldap: LDAPConnection, user: IUser, isNewRecord: boolean, dn: string): Promise<void> {
        /* Implementation Hidden */
    }

	private static async advancedSync(
		ldap: LDAPConnection,
		importUser: IImportUser,
		converter: LDAPUserConverter,
		isNewRecord: boolean,
	): Promise<void> {
        /* Implementation Hidden */
    }

	private static async isUserInGroup(
		ldap: LDAPConnection,
		baseDN: string,
		filter: string,
		{ dn, username }: { dn: string; username: string },
		groupName: string,
	): Promise<boolean> {
        /* Implementation Hidden */
    }

	private static parseJson(json: string): Record<string, any> | undefined {
        /* Implementation Hidden */
    }

	private static async syncUserRoles(ldap: LDAPConnection, user: IUser, dn: string): Promise<void> {
        /* Implementation Hidden */
    }

	private static async createRoomForSync(channel: string): Promise<IRoom | undefined> {
        /* Implementation Hidden */
    }

	private static async syncUserChannels(ldap: LDAPConnection, user: IUser, dn: string): Promise<void> {
        /* Implementation Hidden */
    }

	private static async syncUserTeams(ldap: LDAPConnection, user: IUser, dn: string, isNewRecord: boolean): Promise<void> {
        /* Implementation Hidden */
    }

	private static getDataMappedByLdapGroups(map: Record<string, string>, ldapGroups: Array<string>): Array<string> {
        /* Implementation Hidden */
    }

	private static async getLdapGroupsByUsername(
		ldap: LDAPConnection,
		username: string,
		userDN: string,
		baseDN: string,
		filter: string,
		groupAttributeName?: string,
	): Promise<Array<string>> {
        /* Implementation Hidden */
    }

	private static isUserDeactivated(ldapUser: ILDAPEntry): boolean {
        /* Implementation Hidden */
    }

	public static copyActiveState(ldapUser: ILDAPEntry, userData: IImportUser): void {
        /* Implementation Hidden */
    }

	public static copyCustomFields(ldapUser: ILDAPEntry, userData: IImportUser): void {
        /* Implementation Hidden */
    }

	private static async importNewUsers(ldap: LDAPConnection, converter: LDAPUserConverter): Promise<void> {
        /* Implementation Hidden */
    }

	private static async updateExistingUsers(ldap: LDAPConnection, converter: LDAPUserConverter, disableMissingUsers = false): Promise<void> {
        /* Implementation Hidden */
    }

	private static async disableMissingUsers(foundUsers: IUser['_id'][]): Promise<void> {
        /* Implementation Hidden */
    }

	private static async updateUserAvatars(ldap: LDAPConnection): Promise<void> {
        /* Implementation Hidden */
    }

	private static async updateUserAbacAttributes(ldap: LDAPConnection): Promise<void> {
        /* Implementation Hidden */
    }

	private static async syncUserAbacAttribute(ldap: LDAPConnection, user: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	private static async findLDAPUser(ldap: LDAPConnection, user: IUser): Promise<ILDAPEntry | undefined> {
        /* Implementation Hidden */
    }

	private static async logoutDeactivatedUsers(ldap: LDAPConnection): Promise<void> {
        /* Implementation Hidden */
    }
}

```