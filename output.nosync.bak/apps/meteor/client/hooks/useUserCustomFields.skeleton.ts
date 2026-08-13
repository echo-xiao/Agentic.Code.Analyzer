## File: apps/meteor/client/hooks/useUserCustomFields.ts

```typescript
import { useSetting } from '@rocket.chat/ui-contexts';

type CustomField =
	| {
			[key: string]: string;
	  }
	| undefined;

type CustomFieldDisplay =
	| {
			label: string;
			value?: string;
	  }
	| undefined;

export const useUserCustomFields = (customFields: CustomField): CustomFieldDisplay[] | undefined => {
    /* Implementation Hidden */
};

```