## File: packages/rest-typings/src/v1/autotranslate/AutotranslateGetSupportedLanguagesParamsGET.ts

```typescript
import { ajvQuery } from '../Ajv';

export type AutotranslateGetSupportedLanguagesParamsGET = {
	targetLanguage: string;
};

const AutotranslateGetSupportedLanguagesParamsGETSchema = {
	type: 'object',
	properties: {
		targetLanguage: {
			type: 'string',
		},
	},
	required: ['targetLanguage'],
	additionalProperties: false,
};

export const isAutotranslateGetSupportedLanguagesParamsGET = ajvQuery.compile<AutotranslateGetSupportedLanguagesParamsGET>(
	AutotranslateGetSupportedLanguagesParamsGETSchema,
);

```