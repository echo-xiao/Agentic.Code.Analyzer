## File: apps/meteor/app/slashcommands-ban/client/client.ts

```typescript
import { queryClient } from '../../../client/lib/queryClient';
import { roomsQueryKeys } from '../../../client/lib/queryKeys';
import { slashCommands } from '../../utils/client/slashCommand';

const invalidateMembers = (err: unknown, _result: unknown, params: { msg: { rid: string } }) => {
    /* Implementation Hidden */
};

slashCommands.add({
	command: 'ban',
	providesPreview: false,
	options: {
		description: 'Ban_user_from_room',
		params: '@username',
		permission: 'ban-user',
	},
	result: invalidateMembers,
});

slashCommands.add({
	command: 'unban',
	providesPreview: false,
	options: {
		description: 'Unban_user_from_room',
		params: '@username',
		permission: 'ban-user',
	},
	result: invalidateMembers,
});

```