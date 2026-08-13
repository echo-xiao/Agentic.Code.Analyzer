## File: apps/meteor/app/slashcommand-asciiarts/client/gimme.ts

```typescript
import type { SlashCommandCallbackParams } from '@rocket.chat/core-typings';

import { sdk } from '../../utils/client/lib/SDKClient';
import { slashCommands } from '../../utils/client/slashCommand';
/*
 * Gimme is a named function that will replace /gimme commands
 * @param {Object} message - The message object
 */
async function Gimme({ message, params }: SlashCommandCallbackParams<'gimme'>): Promise<void> {
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