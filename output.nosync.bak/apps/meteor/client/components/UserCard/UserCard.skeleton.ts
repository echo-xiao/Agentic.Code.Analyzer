## File: apps/meteor/client/components/UserCard/UserCard.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Button, IconButton } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useEmbeddedLayout } from '@rocket.chat/ui-client';
import type { ReactNode, ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../MarkdownText';
import * as Status from '../UserStatus';
import UserCardActions from './UserCardActions';
import UserCardDialog from './UserCardDialog';
import UserCardInfo from './UserCardInfo';
import UserCardRoles from './UserCardRoles';
import UserCardUsername from './UserCardUsername';

const clampStyle = css`
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	word-break: break-word;
`;

export type UserCardProps = {
	user?: {
		nickname?: string;
		name?: string;
		username?: string;
		etag?: string;
		customStatus?: ReactNode;
		roles?: ReactNode;
		bio?: ReactNode;
		status?: ReactNode;
		localTime?: ReactNode;
	};
	actions?: ReactNode;
	onOpenUserInfo?: () => void;
	onClose?: () => void;
} & ComponentProps<typeof UserCardDialog>;

const UserCard = ({
	user: { name, username, etag, customStatus, roles, bio, status = <Status.Offline />, localTime, nickname } = {},
	actions,
	onOpenUserInfo,
	onClose,
	...props
}: UserCardProps) => {
    /* Implementation Hidden */
};

export default UserCard;

```