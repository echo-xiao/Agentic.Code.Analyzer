## File: apps/meteor/client/views/admin/moderation/ModerationConsoleTableRow.tsx

```typescript
import type { IModerationAudit, IUser } from '@rocket.chat/core-typings';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';

import ModerationConsoleActions from './ModerationConsoleActions';
import UserColumn from './helpers/UserColumn';
import { normalizeUsername } from '../../../../lib/utils/normalizeUsername';
import { useFormatDateAndTime } from '../../../hooks/useFormatDateAndTime';

export type ModerationConsoleRowProps = {
	report: IModerationAudit;
	onClick: (id: IUser['_id']) => void;
	isDesktopOrLarger: boolean;
};

const ModerationConsoleTableRow = ({ report, onClick, isDesktopOrLarger }: ModerationConsoleRowProps) => {
    /* Implementation Hidden */
};

export default ModerationConsoleTableRow;

```