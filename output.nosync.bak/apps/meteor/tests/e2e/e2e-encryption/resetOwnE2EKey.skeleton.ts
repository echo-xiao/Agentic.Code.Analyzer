## File: apps/meteor/tests/e2e/e2e-encryption/resetOwnE2EKey.ts

```typescript
import { request as baseRequest } from '@playwright/test';

import { BASE_API_URL } from '../config/constants';

type Credentials = {
	password: string;
	username?: string;
	email?: string;
};

export const resetOwnE2EKey = async (credentials: Credentials) => {
    /* Implementation Hidden */
};

```