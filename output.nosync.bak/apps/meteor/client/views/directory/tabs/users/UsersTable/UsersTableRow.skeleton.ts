## File: apps/meteor/client/views/directory/tabs/users/UsersTable/UsersTableRow.tsx

```typescript
import type { IDirectoryUserResult, IUser, Serialized } from '@rocket.chat/core-typings';
import { Box, FlexContainer, FlexItem } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import type { KeyboardEvent, MouseEvent } from 'react';

import MarkdownText from '../../../../../components/MarkdownText';
import { useFormatDate } from '../../../../../hooks/useFormatDate';

export type UsersTableRowProps = {
	user: Serialized<IDirectoryUserResult> & { domain?: string };
	onClick: (username: IUser['username']) => (e: KeyboardEvent | MouseEvent) => void;
	mediaQuery: boolean;
	federation: boolean;
	canViewFullOtherUserInfo: boolean;
};

const UsersTableRow = ({
	user: { createdAt, emails, domain, _id, username, name, bio, avatarETag, nickname },
	onClick,
	mediaQuery,
	federation,
	canViewFullOtherUserInfo,
}: UsersTableRowProps) => {
    /* Implementation Hidden */
};

export default UsersTableRow;

```