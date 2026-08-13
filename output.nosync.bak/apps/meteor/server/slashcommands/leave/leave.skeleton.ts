## File: apps/meteor/server/slashcommands/leave/leave.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { SlashCommandCallbackParams } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { leaveRoomMethod } from '../../../app/lib/server/methods/leaveRoom';
import { settings } from '../../../app/settings/server';
import { slashCommands } from '../../../app/utils/server/slashCommand';
import { i18n } from '../../lib/i18n';

/*
 * Leave is a named function that will replace /leave commands
 * @param {Object} message - The message object
 */
const Leave = async function Leave({ message, userId }: SlashCommandCallbackParams<'leave'>): Promise<void> {
    /* Implementation Hidden */
};

slashCommands.add({
	command: 'leave',
	callback: Leave,
	options: {
		description: 'Leave_the_current_channel',
		permission: ['leave-c', 'leave-p'],
	},
});
slashCommands.add({
	command: 'part',
	callback: Leave,
	options: {
		description: 'Leave_the_current_channel',
		permission: ['leave-c', 'leave-p'],
	},
});

```