## File: apps/meteor/tests/e2e/utils/omnichannel/monitors.ts

```typescript
import type { BaseTest } from '../test';

const deleteMonitor = async (api: BaseTest['api'], username: string) => api.post('/livechat/monitors.delete', { username });

export const createMonitor = async (api: BaseTest['api'], username: string) => {
    /* Implementation Hidden */
};

```