## File: apps/meteor/client/startup/streamMessage/autotranslate.ts

```typescript
import { clientCallbacks } from '@rocket.chat/ui-client';

import { hasPermission } from '../../../app/authorization/client';
import { PermissionsCachedStore } from '../../cachedStores';
import { settings } from '../../lib/settings';
import { Users } from '../../stores';

const STREAM_HANDLER_ID = 'autotranslate-stream';

const applyAutoTranslateStreamHandler = () => {
    /* Implementation Hidden */
};

applyAutoTranslateStreamHandler();
settings.observe('AutoTranslate_Enabled', applyAutoTranslateStreamHandler);
PermissionsCachedStore.useReady.subscribe(applyAutoTranslateStreamHandler);
Users.use.subscribe(applyAutoTranslateStreamHandler);

```