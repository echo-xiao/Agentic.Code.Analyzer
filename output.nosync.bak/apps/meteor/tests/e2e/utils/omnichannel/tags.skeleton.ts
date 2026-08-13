## File: apps/meteor/tests/e2e/utils/omnichannel/tags.ts

```typescript
import { faker } from '@faker-js/faker';
import type { ILivechatTag } from '@rocket.chat/core-typings';

import type { BaseTest } from '../test';

type CreateTagParams = {
	id?: string | null;
	name?: string;
	description?: string;
	departments?: string[];
};

const removeTag = async (api: BaseTest['api'], id: string) => api.post('/livechat/tags.delete', { id });

export const createTag = async (api: BaseTest['api'], { id = null, name, description, departments = [] }: CreateTagParams = {}) => {
    /* Implementation Hidden */
};

```