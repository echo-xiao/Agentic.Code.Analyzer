## File: apps/meteor/app/integrations/server/lib/triggerHandler.ts

```typescript
import type {
	IIntegrationHistory,
	IMessage,
	IOutgoingIntegration,
	IUser,
	OutgoingIntegrationEvent,
	IRoom,
	RequiredField,
	AtLeast,
} from '@rocket.chat/core-typings';
import { Integrations, Users, Rooms, Messages } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { wrapExceptions } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import type { OutgoingRequestData } from './ScriptEngine';
import { processWebhookMessage } from '../../../../server/lib/messages/processWebhookMessage';
import { getRoomByNameOrIdWithOptionToJoin } from '../../../../server/lib/rooms/getRoomByNameOrIdWithOptionToJoin';
import { notifyOnIntegrationChangedById } from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';
import { outgoingEvents } from '../../lib/outgoingEvents';
import { outgoingLogger } from '../logger';
import { IsolatedVMScriptEngine } from './isolated-vm/isolated-vm';
import { updateHistory } from './updateHistory';

type Trigger = Record<string, Record<string, any>>;

type MessageWithEditedAt = IMessage & { editedAt?: Date };
type ArgumentsObject = {
	event?: OutgoingIntegrationEvent;
	message?: MessageWithEditedAt;
	room?: IRoom;
	owner?: IUser;
	user?: IUser;
};
type IntegrationData = {
	token?: string;
	bot: boolean;
	trigger_word?: string;
	channel_id?: string;
	channel_name?: string;
	message_id?: string;
	timestamp?: Date;
	user_id?: string;
	user_name?: string;
	text?: string;
	siteUrl?: string;
	alias?: string;
	isEdited?: boolean;
	tmid?: string;
	user?: Partial<IUser>;
	room?: IRoom;
	message?: IMessage;
	owner?: Partial<IUser>;
};

class RocketChatIntegrationHandler {
	private successResults: number[];

	private triggers: Trigger;

	private ivmEngine: IsolatedVMScriptEngine<false>;

	constructor() {
        /* Implementation Hidden */
    }

	addIntegration(record: IOutgoingIntegration): void {
        /* Implementation Hidden */
    }

	getEngine(_integration: any): IsolatedVMScriptEngine<false> {
        /* Implementation Hidden */
    }

	removeIntegration(record: AtLeast<IOutgoingIntegration, '_id'>): void {
        /* Implementation Hidden */
    }

	isTriggerEnabled(trigger: IOutgoingIntegration): boolean {
        /* Implementation Hidden */
    }

	// Trigger is the trigger, nameOrId is a string which is used to try and find a room, room is a room, message is a message, and data contains "user_name" if trigger.impersonateUser is truthful.
	async sendMessage({
		trigger,
		nameOrId = '',
		room,
		message,
		data,
	}: {
		trigger: IOutgoingIntegration;
		nameOrId?: string;
		room?: IRoom;
		message: { channel: string; bot?: Record<string, any>; message: Partial<IMessage> };
		data: IntegrationData;
	}): Promise<{ channel: string; message: Partial<IMessage> }[] | undefined> {
        /* Implementation Hidden */
    }

	eventNameArgumentsToObject(...args: unknown[]) {
        /* Implementation Hidden */
    }

	mapEventArgsToData(data: IntegrationData, { event, message, room, owner, user }: ArgumentsObject) {
        /* Implementation Hidden */
    }

	getTriggersToExecute(room?: IRoom, message?: MessageWithEditedAt) {
        /* Implementation Hidden */
    }

	async executeTriggers(...args: unknown[]) {
        /* Implementation Hidden */
    }

	async executeTrigger(trigger: IOutgoingIntegration, argObject: ArgumentsObject) {
        /* Implementation Hidden */
    }

	// Ensure that any errors thrown by the script engine will contibue to be compatible with Meteor.Error
	async wrapScriptEngineCall(getter: () => Promise<any>) {
        /* Implementation Hidden */
    }

	async executeTriggerUrl(url: string, trigger: IOutgoingIntegration, { event, message, room, owner, user }: ArgumentsObject, tries = 0) {
        /* Implementation Hidden */
    }

	async replay(integration: IOutgoingIntegration, history: IIntegrationHistory) {
        /* Implementation Hidden */
    }
}
const triggerHandler = new RocketChatIntegrationHandler();
export { triggerHandler };

```