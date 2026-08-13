## File: apps/meteor/tests/e2e/utils/parseMeteorResponse.ts

```typescript
import type { APIResponse } from '@playwright/test';
import type { Serialized } from '@rocket.chat/core-typings';

export const parseMeteorResponse = async <ResponseType = unknown>(response: APIResponse): Promise<Serialized<ResponseType>> => {
    /* Implementation Hidden */
};

```