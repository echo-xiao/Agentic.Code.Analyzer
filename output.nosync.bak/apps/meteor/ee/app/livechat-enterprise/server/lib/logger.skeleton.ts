## File: apps/meteor/ee/app/livechat-enterprise/server/lib/logger.ts

```typescript
import { Logger } from '@rocket.chat/logger';

export const logger = new Logger('LivechatEnterprise');

export const queriesLogger = logger.section('Queries');
export const helperLogger = logger.section('Helper');
export const cbLogger = logger.section('Callbacks');
export const bhLogger = logger.section('Business-Hours');
export const contactLogger = logger.section('Contacts');

export const schedulerLogger = new Logger('Scheduler');

```