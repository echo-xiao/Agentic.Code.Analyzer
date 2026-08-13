## File: apps/meteor/app/mentions/server/getMentionedTeamMembers.ts

```typescript
import { Team } from '@rocket.chat/core-services';
import type { MessageMention } from '@rocket.chat/core-typings';

import { callbacks } from '../../../server/lib/callbacks';
import { settings } from '../../settings/server';

const beforeGetMentions = async (mentionIds: string[], teamMentions: MessageMention[]): Promise<string[]> => {
    /* Implementation Hidden */
};

settings.watch<boolean>('Troubleshoot_Disable_Teams_Mention', (value) => {
	if (value) {
		callbacks.remove('beforeGetMentions', 'before-get-mentions-get-teams');
	} else {
		callbacks.add('beforeGetMentions', beforeGetMentions, callbacks.priority.MEDIUM, 'before-get-mentions-get-teams');
	}
});

```