## File: apps/meteor/client/views/admin/invites/InviteRow.tsx

```typescript
import type { IInvite } from '@rocket.chat/core-typings';
import { Box, IconButton } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatDateAndTime } from '../../../hooks/useFormatDateAndTime';
import { useTimeFromNow } from '../../../hooks/useTimeFromNow';

const isExpired = (expires: IInvite['expires']): boolean => {
    /* Implementation Hidden */
};

export type InviteRowProps = Omit<IInvite, 'createdAt' | 'expires' | '_updatedAt'> & {
	onRemove: (removeInvite: () => Promise<boolean>) => void;
	_updatedAt: string;
	createdAt: string;
	expires: string | null;
};

const InviteRow = ({ _id, createdAt, expires, uses, maxUses, onRemove }: InviteRowProps) => {
    /* Implementation Hidden */
};

export default InviteRow;

```