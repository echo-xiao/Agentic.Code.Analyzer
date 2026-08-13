## File: apps/meteor/app/slashcommands-create/client/client.ts

```typescript
import { slashCommands } from '../../utils/client/slashCommand';

slashCommands.add({
	command: 'create',
	options: {
		description: 'Create_A_New_Channel',
		params: '#channel',
		permission: ['create-c', 'create-p'],
	},
	providesPreview: false,
});

```