## File: apps/meteor/tests/data/livechat/tags.ts

```typescript
import { faker } from '@faker-js/faker';
import type { ILivechatTag, FindTagsResult } from '@rocket.chat/core-typings';

import { credentials, request, api } from '../api-data';
import type { DummyResponse } from './utils';

export const listTags = async (): Promise<FindTagsResult> => {
    /* Implementation Hidden */
};

export const saveTags = async (departments: string[] = []): Promise<ILivechatTag> => {
    /* Implementation Hidden */
};

export const removeAllTags = async (): Promise<boolean> => {
    /* Implementation Hidden */
};

export const removeTag = (id: string): Promise<boolean> => {
    /* Implementation Hidden */
};

```