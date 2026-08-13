## File: apps/meteor/client/lib/utils/getCodeSettingError.ts

```typescript
import type { TranslationKey } from '@rocket.chat/ui-contexts';

import { isJSON } from '../../../lib/utils/isJSON';

type CodeSettingValidator = (value: string) => TranslationKey | undefined;

const validatorsByMimeType: Record<string, CodeSettingValidator> = {
	'application/json': (value) => (value === '' || isJSON(value) ? undefined : 'Invalid_JSON'),
};

export const getCodeSettingError = (code: string | undefined, value: unknown): TranslationKey | undefined => {
    /* Implementation Hidden */
};

```