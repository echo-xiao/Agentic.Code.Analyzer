## File: apps/meteor/client/components/UserStatusText/UserStatusText.tsx

```typescript
import { UserStatus } from '@rocket.chat/core-typings';
import { Box, Icon } from '@rocket.chat/fuselage';
import { isTruthy } from '@rocket.chat/tools';
import { useTranslation } from 'react-i18next';

import { useExpirationText } from '../../hooks/useExpirationText';
import MarkdownText from '../MarkdownText';

const STATUS_LABEL_KEYS: Record<UserStatus, string> = {
	[UserStatus.ONLINE]: 'Online',
	[UserStatus.AWAY]: 'Away',
	[UserStatus.BUSY]: 'Busy',
	[UserStatus.OFFLINE]: 'Offline',
	[UserStatus.DISABLED]: 'Disabled',
};

export type UserStatusTextProps = {
	status?: UserStatus;
	statusText?: string;
	statusExpiresAt?: Date | string;
};

const UserStatusText = ({ status, statusText, statusExpiresAt }: UserStatusTextProps) => {
    /* Implementation Hidden */
};

export default UserStatusText;

```