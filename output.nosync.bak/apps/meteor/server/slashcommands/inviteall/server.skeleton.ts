## File: apps/meteor/server/slashcommands/inviteall/server.ts

```typescript
/*
 * Invite is a named function that will replace /invite commands
 * @param {Object} message - The message object
 */

import { api } from '@rocket.chat/core-services';
import type { ISubscription, SlashCommand, SlashCommandCallbackParams } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';
import { isTruthy } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';

import { canAccessRoomAsync } from '../../../app/authorization/server';
import { addUsersToRoomMethod } from '../../../app/lib/server/methods/addUsersToRoom';
import { createChannelMethod } from '../../../app/lib/server/methods/createChannel';
import { createPrivateGroupMethod } from '../../../app/lib/server/methods/createPrivateGroup';
import { settings } from '../../../app/settings/server';
import { slashCommands } from '../../../app/utils/server/slashCommand';
import { i18n } from '../../lib/i18n';

function inviteAll<T extends string>(type: T): SlashCommand<T>['callback'] {
    /* Implementation Hidden */
}

slashCommands.add({
	command: 'invite-all-to',
	callback: inviteAll('to'),
	options: {
		description: 'Invite_user_to_join_channel_all_to',
		params: '#room',
		permission: ['add-user-to-joined-room', 'add-user-to-any-c-room', 'add-user-to-any-p-room'],
	},
});
slashCommands.add({
	command: 'invite-all-from',
	callback: inviteAll('from'),
	options: {
		description: 'Invite_user_to_join_channel_all_from',
		params: '#room',
		permission: 'add-user-to-joined-room',
	},
});
module.exports = inviteAll;

```