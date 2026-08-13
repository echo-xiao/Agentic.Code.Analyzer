## File: apps/meteor/lib/mapLivechatContactConflicts.ts

```typescript
import type { CustomFieldMetadata, ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import type { TranslationKey } from '@rocket.chat/ui-contexts';

const fieldNameMap: { [key: string]: TranslationKey } = {
	name: 'Name',
	contactManager: 'Contact_Manager',
};

type MappedContactConflicts = Record<string, { name: string; label: string; values: string[] }>;

export function mapLivechatContactConflicts(
	contact: Serialized<ILivechatContact>,
	metadata: CustomFieldMetadata[] = [],
): MappedContactConflicts {
    /* Implementation Hidden */
}

```