## File: packages/rest-typings/src/v1/autoTranslate.ts

```typescript
import type { ISupportedLanguage } from '@rocket.chat/core-typings';

import type { AutotranslateGetSupportedLanguagesParamsGET } from './autotranslate/AutotranslateGetSupportedLanguagesParamsGET';
import type { AutotranslateSaveSettingsParamsPOST } from './autotranslate/AutotranslateSaveSettingsParamsPOST';

export type AutoTranslateEndpoints = {
	'/v1/autotranslate.getSupportedLanguages': {
		GET: (params: AutotranslateGetSupportedLanguagesParamsGET) => { languages: ISupportedLanguage[] };
	};
	'/v1/autotranslate.saveSettings': {
		POST: (params: AutotranslateSaveSettingsParamsPOST) => void;
	};
};

```