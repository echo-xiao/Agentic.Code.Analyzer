## File: apps/meteor/app/importer/server/classes/converters/ContactConverter.ts

```typescript
import type { IImportContact, IImportContactRecord } from '@rocket.chat/core-typings';
import { LivechatVisitors } from '@rocket.chat/models';

import { RecordConverter } from './RecordConverter';
import { createContact } from '../../../../livechat/server/lib/contacts/createContact';
import { getAllowedCustomFields } from '../../../../livechat/server/lib/contacts/getAllowedCustomFields';
import { validateCustomFields } from '../../../../livechat/server/lib/contacts/validateCustomFields';

export class ContactConverter extends RecordConverter<IImportContactRecord> {
	protected async convertCustomFields(customFields: IImportContact['customFields']): Promise<IImportContact['customFields']> {
        /* Implementation Hidden */
    }

	protected override async convertRecord(record: IImportContactRecord): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async generateNewContactName(): Promise<string> {
        /* Implementation Hidden */
    }

	protected override getDataType(): 'contact' {
        /* Implementation Hidden */
    }
}

```