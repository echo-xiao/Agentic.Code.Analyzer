## File: ee/packages/omni-core-ee/src/utils/logger.ts

```typescript
import { Logger } from '@rocket.chat/logger';

export const defaultLogger = new Logger('OmniCore-ee');
export const hooksLogger = defaultLogger.section('hooks');

```