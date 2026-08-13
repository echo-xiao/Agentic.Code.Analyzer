## File: apps/meteor/client/views/omnichannel/departments/DepartmentAgentsTable/DepartmentAgentsTable.tsx

```typescript
import { Pagination } from '@rocket.chat/fuselage';
import { GenericTable, GenericTableBody, GenericTableHeader, GenericTableHeaderCell, usePagination } from '@rocket.chat/ui-client';
import type { AriaAttributes } from 'react';
import { useMemo } from 'react';
import type { Control, UseFormRegister } from 'react-hook-form';
import { useWatch, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { EditDepartmentFormData } from '../definitions';
import AddAgent from './AddAgent';
import AgentRow from './AgentRow';

type DepartmentAgentsTableProps = Pick<AriaAttributes, 'aria-labelledby'> & {
	control: Control<EditDepartmentFormData>;
	register: UseFormRegister<EditDepartmentFormData>;
};

function DepartmentAgentsTable({ control, register, 'aria-labelledby': ariaLabelledBy }: DepartmentAgentsTableProps) {
    /* Implementation Hidden */
}

export default DepartmentAgentsTable;

```