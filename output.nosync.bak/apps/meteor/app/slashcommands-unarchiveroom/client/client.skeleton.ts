## File: apps/meteor/app/slashcommands-unarchiveroom/client/client.ts

```typescript
import { slashCommands } from '../../utils/client/slashCommand';

slashCommands.add({
	command: 'unarchive',
	options: {
		description: 'Unarchive',
		params: '#channel',
		permission: 'unarchive-room',
	},
	providesPreview: false,
});

```