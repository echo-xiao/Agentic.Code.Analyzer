## File: apps/meteor/client/views/root/hooks/useCorsSSLConfig.ts

```typescript
// TODO: remove this hook together with the Meteor webapp/DDP layer — it only
// patches Meteor.absoluteUrl's `secure` default, which has no consumers once
// Meteor.absoluteUrl is gone.
import { useSetting } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { absoluteUrl } from '../../../lib/absoluteUrl';

export const useCorsSSLConfig = () => {
    /* Implementation Hidden */
};

```