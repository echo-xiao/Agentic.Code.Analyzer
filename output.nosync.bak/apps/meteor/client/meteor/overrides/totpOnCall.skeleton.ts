## File: apps/meteor/client/meteor/overrides/totpOnCall.ts

```typescript
import { Meteor } from 'meteor/meteor';

import { t } from '../../../app/utils/lib/i18n';
import type { LoginCallback } from '../../lib/2fa/overrideLoginMethod';
import { process2faReturn, process2faAsyncReturn } from '../../lib/2fa/process2faReturn';
import { isTotpInvalidError } from '../../lib/2fa/utils';

const withSyncTOTP = (call: (name: string, ...args: any[]) => any) => {
    /* Implementation Hidden */
};

const withAsyncTOTP = <T extends (name: string, ...args: any[]) => Promise<any>>(callAsync: T): T => {
    /* Implementation Hidden */
};

Meteor.call = withSyncTOTP(Meteor.call);
Meteor.callAsync = withAsyncTOTP(Meteor.callAsync);

```