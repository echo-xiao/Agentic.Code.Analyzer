## File: apps/meteor/client/views/admin/customUserStatus/CustomUserStatusTable/CustomUserStatusRow.tsx

```typescript
import type { IUserStatus } from '@rocket.chat/core-typings';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../../../../components/MarkdownText';

const style: CSSProperties = { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' };

export type CustomUserStatusRowProps = {
	status: IUserStatus;
	onClick: (id: string) => void;
};

const CustomUserStatusRow = ({ status, onClick }: CustomUserStatusRowProps) => {
    /* Implementation Hidden */
};

export default CustomUserStatusRow;

```