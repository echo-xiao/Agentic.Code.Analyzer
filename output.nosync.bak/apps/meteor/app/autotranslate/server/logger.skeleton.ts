## File: apps/meteor/app/autotranslate/server/logger.ts

```typescript
import { Logger } from '@rocket.chat/logger';

const logger = new Logger('AutoTranslate');

export const msLogger = logger.section('Microsoft');

export const libreLogger = logger.section('LibreTranslate');

```