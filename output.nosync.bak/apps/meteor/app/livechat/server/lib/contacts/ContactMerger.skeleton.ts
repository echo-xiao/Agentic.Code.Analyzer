## File: apps/meteor/app/livechat/server/lib/contacts/ContactMerger.ts

```typescript
import type {
	ILivechatContact,
	ILivechatVisitor,
	ILivechatContactChannel,
	ILivechatContactConflictingField,
	IUser,
	DeepWritable,
	IOmnichannelSource,
} from '@rocket.chat/core-typings';
import { LivechatContacts } from '@rocket.chat/models';
import type { ClientSession, UpdateFilter } from 'mongodb';

import { getContactManagerIdByUsername } from './getContactManagerIdByUsername';
import { isSameChannel } from '../../../lib/isSameChannel';

type ManagerValue = { id: string } | { username: string };
type ContactFields = {
	email: string;
	phone: string;
	name: string;
	username: string;
	manager: ManagerValue;
	channel: ILivechatContactChannel;
	activity: string[];
};

type CustomFieldAndValue = { type: `customFields.${string}`; value: string };

export type FieldAndValue =
	| { type: keyof Omit<ContactFields, 'manager' | 'channel'>; value: string }
	| { type: 'manager'; value: ManagerValue }
	| { type: 'channel'; value: ILivechatContactChannel }
	| { type: 'activity'; value: string[] }
	| CustomFieldAndValue;

type ConflictHandlingMode = 'conflict' | 'overwrite' | 'ignore';

type MergeFieldsIntoContactParams = {
	fields: FieldAndValue[];
	contact: ILivechatContact;
	conflictHandlingMode?: ConflictHandlingMode;
	session?: ClientSession;
};

export class ContactMerger {
	private managerList = new Map<Required<IUser>['username'], IUser['_id'] | undefined>();

	private getManagerId(manager: ManagerValue): IUser['_id'] | undefined {
        /* Implementation Hidden */
    }

	private isSameManager(manager1: ManagerValue, manager2: ManagerValue): boolean {
        /* Implementation Hidden */
    }

	private isSameField(field1: FieldAndValue, field2: FieldAndValue): boolean {
        /* Implementation Hidden */
    }

	private async loadDataForFields(session: ClientSession | undefined, ...fieldLists: FieldAndValue[][]): Promise<void> {
        /* Implementation Hidden */
    }

	static async createWithFields(session: ClientSession | undefined, ...fieldLists: FieldAndValue[][]): Promise<ContactMerger> {
        /* Implementation Hidden */
    }

	static getAllFieldsFromContact(contact: ILivechatContact): FieldAndValue[] {
        /* Implementation Hidden */
    }

	static async getAllFieldsFromVisitor(visitor: ILivechatVisitor, source?: IOmnichannelSource): Promise<FieldAndValue[]> {
        /* Implementation Hidden */
    }

	static getFieldValuesByType<T extends keyof ContactFields>(fields: FieldAndValue[], type: T): ContactFields[T][] {
        /* Implementation Hidden */
    }

	static async mergeFieldsIntoContact({
		fields,
		contact,
		conflictHandlingMode = 'conflict',
		session,
	}: MergeFieldsIntoContactParams): Promise<void> {
        /* Implementation Hidden */
    }

	public static async mergeVisitorIntoContact(
		visitor: ILivechatVisitor,
		contact: ILivechatContact,
		source?: IOmnichannelSource,
	): Promise<void> {
        /* Implementation Hidden */
    }
}

```