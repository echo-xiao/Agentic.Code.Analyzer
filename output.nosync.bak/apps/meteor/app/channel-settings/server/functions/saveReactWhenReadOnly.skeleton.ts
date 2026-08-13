## File: apps/meteor/app/channel-settings/server/functions/saveReactWhenReadOnly.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import { Rooms } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const saveReactWhenReadOnly = async function (
	rid: string,
	allowReact: boolean,
	user: {
		_id: string;
		username: string;
	},
	sendMessage = true,
) {
    /* Implementation Hidden */
};

```