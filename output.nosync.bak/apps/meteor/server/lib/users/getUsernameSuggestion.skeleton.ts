## File: apps/meteor/server/lib/users/getUsernameSuggestion.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import limax from 'limax';

import { settings } from '../../../app/settings/server';

function slug(text: string): string {
    /* Implementation Hidden */
}

async function usernameIsAvailable(username: string): Promise<boolean> {
    /* Implementation Hidden */
}

const name = (username: string): string => (settings.get('UTF8_Names_Slugify') ? slug(username) : username);

export async function generateUsernameSuggestion(user: Pick<IUser, 'name' | 'emails' | 'services'>): Promise<string | undefined> {
    /* Implementation Hidden */
}

```