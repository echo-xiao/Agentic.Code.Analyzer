## File: apps/meteor/app/livechat/server/lib/custom-fields.ts

```typescript
import type { ILivechatContact, ILivechatCustomField, ILivechatVisitor } from '@rocket.chat/core-typings';
import { LivechatContacts, LivechatCustomField, LivechatRooms, LivechatVisitors } from '@rocket.chat/models';

import { livechatLogger } from './logger';
import { i18n } from '../../../utils/lib/i18n';

export const validateRequiredCustomFields = (customFields: string[], livechatCustomFields: ILivechatCustomField[]) => {
    /* Implementation Hidden */
};

export async function updateContactsCustomFields(
	contact: ILivechatContact,
	validCustomFields: {
		key: string;
		value: string;
		overwrite: boolean;
	}[],
): Promise<void> {
    /* Implementation Hidden */
}

export async function setCustomFields({
	token,
	key,
	value,
	overwrite,
}: {
	key: string;
	value: string;
	overwrite: boolean;
	token: string;
}): Promise<number> {
    /* Implementation Hidden */
}

export async function setMultipleVisitorCustomFields(
	visitor: ILivechatVisitor,
	customFields: {
		key: string;
		value: string;
		overwrite: boolean;
	}[],
	livechatCustomFields?: ILivechatCustomField[],
) {
    /* Implementation Hidden */
}

export async function setMultipleCustomFields({
	visitor,
	customFields,
}: {
	visitor: ILivechatVisitor;
	customFields: {
		key: string;
		value: string;
		overwrite: boolean;
	}[];
}): Promise<
	{
		key: string;
		value: string;
		overwrite: boolean;
	}[]
> {
    /* Implementation Hidden */
}

```