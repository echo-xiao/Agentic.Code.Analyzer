## File: apps/meteor/client/views/oauth/components/CurrentUserDisplay.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { UserStatus } from '@rocket.chat/ui-client';
import { useRolesDescription, useSetting } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LocalTime from '../../../components/LocalTime';
import MarkdownText from '../../../components/MarkdownText';
import { UserCard, UserCardInfo, UserCardRole } from '../../../components/UserCard';

const clampStyle = css`
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	word-break: break-all;
`;

export type CurrentUserDisplayProps = {
	user: IUser;
};

const CurrentUserDisplay = ({ user }: CurrentUserDisplayProps) => {
    /* Implementation Hidden */
};

export default CurrentUserDisplay;

```