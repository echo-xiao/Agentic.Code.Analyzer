## File: apps/meteor/client/views/admin/import/PrepareContacts.tsx

```typescript
import type { IImporterSelectionContact } from '@rocket.chat/core-typings';
import { CheckBox, Table, Pagination, TableHead, TableRow, TableCell, TableBody } from '@rocket.chat/fuselage';
import { usePagination } from '@rocket.chat/ui-client';
import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

export type PrepareContactsProps = {
	contactsCount: number;
	contacts: IImporterSelectionContact[];
	setContacts: Dispatch<SetStateAction<IImporterSelectionContact[]>>;
};

const PrepareContacts = ({ contactsCount, contacts, setContacts }: PrepareContactsProps) => {
    /* Implementation Hidden */
};

export default PrepareContacts;

```