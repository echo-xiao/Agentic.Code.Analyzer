## File: apps/meteor/server/lib/ldap/Manager.ts

```typescript
import type { ILDAPEntry, LDAPLoginResult, ILDAPUniqueIdentifierField, IUser, LoginUsername, IImportUser } from '@rocket.chat/core-typings';
import { Users as UsersRaw } from '@rocket.chat/models';
import { SHA256 } from '@rocket.chat/sha256';
import ldapEscape from 'ldap-escape';
import limax from 'limax';
// #ToDo: #TODO: Remove Meteor dependencies
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import { LDAPConnection } from './Connection';
import { logger, authLogger, connLogger } from './Logger';
import { LDAPUserConverter } from './UserConverter';
import { getLDAPConditionalSetting } from './getLDAPConditionalSetting';
import { getLdapDynamicValue } from './getLdapDynamicValue';
import { getLdapString } from './getLdapString';
import { ldapKeyExists } from './ldapKeyExists';
import type { UserConverterOptions } from '../../../app/importer/server/classes/converters/UserConverter';
import { settings } from '../../../app/settings/server';
import { omit } from '../../../lib/utils/omit';
import { callbacks } from '../callbacks';
import { setUserAvatar } from '../users/setUserAvatar';

export class LDAPManager {
	public static async login(username: string, password: string): Promise<LDAPLoginResult> {
        /* Implementation Hidden */
    }

	public static async loginAuthenticatedUser(username: string): Promise<LDAPLoginResult> {
        /* Implementation Hidden */
    }

	public static async testConnection(): Promise<void> {
        /* Implementation Hidden */
    }

	public static async testSearch(username: string): Promise<void> {
        /* Implementation Hidden */
    }

	public static async syncUserAvatar(user: IUser, ldapUser: ILDAPEntry): Promise<void> {
        /* Implementation Hidden */
    }

	// This method will only find existing users that are already linked to LDAP
	protected static async findExistingLDAPUser(ldapUser: ILDAPEntry): Promise<IUser | undefined | null> {
        /* Implementation Hidden */
    }

	protected static getConverterOptions(): UserConverterOptions {
        /* Implementation Hidden */
    }

	protected static mapUserData(ldapUser: ILDAPEntry, usedUsername?: string | undefined): IImportUser {
        /* Implementation Hidden */
    }

	private static onMapUserData(ldapUser: ILDAPEntry, userData: IImportUser): void {
        /* Implementation Hidden */
    }

	private static async findUser(ldap: LDAPConnection, username: string, password: string): Promise<ILDAPEntry | undefined> {
        /* Implementation Hidden */
    }

	private static async findAuthenticatedUser(ldap: LDAPConnection, username: string): Promise<ILDAPEntry | undefined> {
        /* Implementation Hidden */
    }

	private static async loginNewUserFromLDAP(
		slugifiedUsername: string,
		ldap: LDAPConnection,
		ldapUser: ILDAPEntry,
		ldapPass?: string,
	): Promise<LDAPLoginResult> {
        /* Implementation Hidden */
    }

	private static async addLdapUser(
		ldapUser: ILDAPEntry,
		username: string | undefined,
		password: string | undefined,
		ldap: LDAPConnection,
	): Promise<LDAPLoginResult> {
        /* Implementation Hidden */
    }

	private static async onLogin(
		ldapUser: ILDAPEntry,
		user: IUser,
		password: string | undefined,
		ldap: LDAPConnection,
		isNewUser: boolean,
	): Promise<void> {
        /* Implementation Hidden */
    }

	private static async loginExistingUser(
		ldap: LDAPConnection,
		user: IUser,
		ldapUser: ILDAPEntry,
		password?: string,
	): Promise<LDAPLoginResult> {
        /* Implementation Hidden */
    }

	private static async syncUserForLogin(
		ldapUser: ILDAPEntry,
		existingUser?: IUser,
		usedUsername?: string | undefined,
	): Promise<IUser | undefined | null> {
        /* Implementation Hidden */
    }

	private static getLdapUserUniqueID(ldapUser: ILDAPEntry): ILDAPUniqueIdentifierField | undefined {
        /* Implementation Hidden */
    }

	private static getLdapName(ldapUser: ILDAPEntry): string | undefined {
        /* Implementation Hidden */
    }

	private static getLdapExtension(ldapUser: ILDAPEntry): string | undefined {
        /* Implementation Hidden */
    }

	private static getLdapEmails(ldapUser: ILDAPEntry, username?: string): string[] {
        /* Implementation Hidden */
    }

	private static slugify(text: string): string {
        /* Implementation Hidden */
    }

	private static slugifyUsername(ldapUser: ILDAPEntry, requestUsername: string): string {
        /* Implementation Hidden */
    }

	protected static getLdapUsername(ldapUser: ILDAPEntry): string | undefined {
        /* Implementation Hidden */
    }

	protected static getFederationHomeServer(ldapUser: ILDAPEntry): string | undefined {
        /* Implementation Hidden */
    }

	// This method will find existing users by LDAP id or by username.
	private static async findExistingUser(ldapUser: ILDAPEntry, slugifiedUsername: string): Promise<IUser | undefined | null> {
        /* Implementation Hidden */
    }

	private static fallbackToDefaultLogin(username: LoginUsername, password: string): LDAPLoginResult {
        /* Implementation Hidden */
    }

	private static getAvatarFromUser(ldapUser: ILDAPEntry): any | undefined {
        /* Implementation Hidden */
    }
}

```