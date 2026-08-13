## File: apps/meteor/client/views/admin/moderation/UserReports/ModConsoleUserTableRow.tsx

```typescript
import type { IUser, UserReport, Serialized } from '@rocket.chat/core-typings';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';

import ModConsoleUserActions from './ModConsoleUserActions';
import { normalizeUsername } from '../../../../../lib/utils/normalizeUsername';
import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';
import UserColumn from '../helpers/UserColumn';

export type ModConsoleUserRowProps = {
	report: Serialized<Pick<UserReport, '_id' | 'reportedUser' | 'ts'> & { count: number }>;
	onClick: (id: IUser['_id']) => void;
	isDesktopOrLarger: boolean;
};

const ModConsoleUserTableRow = ({ report, onClick, isDesktopOrLarger }: ModConsoleUserRowProps) => {
    /* Implementation Hidden */
};

export default ModConsoleUserTableRow;

```