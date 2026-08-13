## File: apps/meteor/app/2fa/server/MethodInvocationOverride.js

```typescript
import { DDP } from 'meteor/ddp';
import { DDPCommon } from 'meteor/ddp-common';

class MethodInvocation extends DDPCommon.MethodInvocation {
	constructor(options) {
        /* Implementation Hidden */
    }
}

DDPCommon.MethodInvocation = MethodInvocation;

```