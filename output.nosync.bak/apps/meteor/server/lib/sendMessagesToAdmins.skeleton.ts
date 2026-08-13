## File: apps/meteor/server/lib/sendMessagesToAdmins.ts

```typescript
import type { IUser, IMessage } from '@rocket.chat/core-typings';
import { Roles, Users } from '@rocket.chat/models';

import { notifyOnUserChangeAsync } from '../../app/lib/server/lib/notifyListener';
import { executeSendMessage } from '../../app/lib/server/methods/sendMessage';
import { createDirectMessage } from '../methods/createDirectMessage';
import { SystemLogger } from './logger/system';

type Banner = {
	id: string;
	priority: number;
	title: string;
	text: string;
	textArguments?: string[];
	modifiers: string[];
	link: string;
};

const getData = async <T>(param: T[] | ((params: { adminUser: IUser }) => Promise<T[] | T>), adminUser: IUser): Promise<T[]> => {
    /* Implementation Hidden */
};

export async function sendMessagesToAdmins({
	fromId = 'rocket.cat',
	checkFrom = true,
	msgs = [],
	banners = [],
}: {
	fromId?: string;
	checkFrom?: boolean;
	msgs?: Partial<IMessage>[] | ((params: { adminUser: IUser }) => Promise<Partial<IMessage>[] | Partial<IMessage>>);
	banners?: Banner[] | ((params: { adminUser: IUser }) => Promise<Banner[]>);
}): Promise<void> {
    /* Implementation Hidden */
}

```