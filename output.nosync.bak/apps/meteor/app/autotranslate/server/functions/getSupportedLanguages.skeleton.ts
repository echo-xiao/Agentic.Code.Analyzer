## File: apps/meteor/app/autotranslate/server/functions/getSupportedLanguages.ts

```typescript
import { Meteor } from 'meteor/meteor';

import { TranslationProviderRegistry } from '..';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { settings } from '../../../settings/server';

export const getSupportedLanguages = async (userId: string, targetLanguage: string) => {
    /* Implementation Hidden */
};

```