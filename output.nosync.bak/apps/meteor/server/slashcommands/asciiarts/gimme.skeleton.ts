## File: apps/meteor/server/slashcommands/asciiarts/gimme.ts

```typescript
import type { SlashCommandCallbackParams } from '@rocket.chat/core-typings';

import { executeSendMessage } from '../../../app/lib/server/methods/sendMessage';
import { slashCommands } from '../../../app/utils/server/slashCommand';
/*
 * Gimme is a named function that will replace /gimme commands
 * @param {Object} message - The message object
 */

async function Gimme({ message, params, userId }: SlashCommandCallbackParams<'gimme'>): Promise<void> {
    /* Implementation Hidden */
}

slashCommands.add({
	command: 'gimme',
	callback: Gimme,
	options: {
		description: 'Slash_Gimme_Description',
		params: 'your_message_optional',
		clientOnly: true,
	},
});

```