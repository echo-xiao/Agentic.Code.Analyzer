## File: apps/meteor/tests/data/chat.helper.ts

```typescript
import type { Credentials } from '@rocket.chat/api-client';
import type { IRoom, IMessage } from '@rocket.chat/core-typings';

import { api, credentials, request } from './api-data';

export const sendSimpleMessage = ({
	roomId,
	text = 'test message',
	tmid,
	userCredentials = credentials,
}: {
	roomId: IRoom['_id'];
	text?: string;
	tmid?: IMessage['_id'];
	userCredentials?: Credentials;
}) => {
    /* Implementation Hidden */
};

export const sendMessage = ({
	message,
	requestCredentials,
}: {
	message: { rid: IRoom['_id']; msg: string } & Partial<Omit<IMessage, 'rid' | 'msg'>>;
	requestCredentials?: Credentials;
}) => {
    /* Implementation Hidden */
};

export const starMessage = ({ messageId, requestCredentials }: { messageId: IMessage['_id']; requestCredentials?: Credentials }) => {
    /* Implementation Hidden */
};

export const pinMessage = ({
	messageId,
	requestCredentials,
	unpin = false,
}: {
	messageId: IMessage['_id'];
	requestCredentials?: Credentials;
	unpin?: boolean;
}) => {
    /* Implementation Hidden */
};

export const deleteMessage = ({ roomId, msgId }: { roomId: IRoom['_id']; msgId: IMessage['_id'] }) => {
    /* Implementation Hidden */
};

export const getMessageById = ({ msgId }: { msgId: IMessage['_id'] }) => {
    /* Implementation Hidden */
};

export const followMessage = ({ msgId, requestCredentials }: { msgId: IMessage['_id']; requestCredentials?: Credentials }) => {
    /* Implementation Hidden */
};

export const updateMessage = ({
	msgId,
	requestCredentials,
	updatedMessage,
	roomId,
}: {
	msgId: IMessage['_id'];
	requestCredentials?: Credentials;
	updatedMessage: string;
	roomId?: IRoom['_id'];
}) => {
    /* Implementation Hidden */
};

```