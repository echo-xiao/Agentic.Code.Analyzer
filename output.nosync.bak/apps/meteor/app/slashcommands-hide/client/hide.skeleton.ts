## File: apps/meteor/app/slashcommands-hide/client/hide.ts

```typescript
import { slashCommands } from '../../utils/client/slashCommand';

slashCommands.add({
	command: 'hide',
	options: {
		description: 'Hide_room',
		params: '#room',
	},
});

```