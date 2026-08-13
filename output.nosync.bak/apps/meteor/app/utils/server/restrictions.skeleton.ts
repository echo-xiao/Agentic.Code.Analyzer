## File: apps/meteor/app/utils/server/restrictions.ts

```typescript
import { settings } from '../../settings/server';
import { fileUploadIsValidContentTypeFromSettings } from '../lib/restrictions';

export const fileUploadIsValidContentType = function (type: string | undefined, customWhiteList?: string): boolean {
    /* Implementation Hidden */
};

```