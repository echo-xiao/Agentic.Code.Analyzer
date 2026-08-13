## File: ee/apps/account-service/src/lib/loginViaResume.ts

```typescript
import type { ILoginResult } from '@rocket.chat/core-services';
import { MeteorError } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { _hashLoginToken, _tokenExpiration } from './utils';

export async function loginViaResume(resume: string, loginExpiration: number): Promise<false | ILoginResult> {
    /* Implementation Hidden */
}

```