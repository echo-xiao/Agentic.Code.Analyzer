## File: apps/meteor/app/utils/server/lib/getValidRoomName.ts

```typescript
import { Rooms } from '@rocket.chat/models';
import { escapeHTML } from '@rocket.chat/string-helpers';
import limax from 'limax';
import { Meteor } from 'meteor/meteor';

import { validateName } from '../../../../server/lib/shared/validateName';
import { settings } from '../../../settings/server';

export const getValidRoomName = async (displayName: string, rid = '', options: { allowDuplicates?: boolean } = {}) => {
    /* Implementation Hidden */
};

```