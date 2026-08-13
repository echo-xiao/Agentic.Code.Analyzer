## File: apps/meteor/client/views/account/tokens/AccountTokensTable/AccountTokensRow.tsx

```typescript
import type { IPersonalAccessToken, Serialized } from '@rocket.chat/core-typings';
import { ButtonGroup, IconButton } from '@rocket.chat/fuselage';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';

export type AccountTokensRowProps = {
	isMedium: boolean;
	onRegenerate: (name: string) => void;
	onRemove: (name: string) => void;
} & Serialized<Pick<IPersonalAccessToken, 'name' | 'createdAt' | 'lastTokenPart' | 'bypassTwoFactor'>>;

const AccountTokensRow = ({ bypassTwoFactor, createdAt, isMedium, lastTokenPart, name, onRegenerate, onRemove }: AccountTokensRowProps) => {
    /* Implementation Hidden */
};

export default AccountTokensRow;

```