## File: apps/meteor/client/components/UserInfo/UserInfo.tsx

```typescript
import type { IUser, Serialized } from '@rocket.chat/core-typings';
import { Box, Margins, Tag } from '@rocket.chat/fuselage';
import {
	useUserDisplayName,
	ContextualbarScrollableContent,
	InfoPanel,
	InfoPanelActionGroup,
	InfoPanelAvatar,
	InfoPanelField,
	InfoPanelLabel,
	InfoPanelSection,
	InfoPanelText,
	InfoPanelTitle,
} from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { memo, useId } from 'react';
import { useTranslation } from 'react-i18next';

import { useTimeAgo } from '../../hooks/useTimeAgo';
import { useUserCustomFields } from '../../hooks/useUserCustomFields';
import MarkdownText from '../MarkdownText';
import UTCClock from '../UTCClock';
import { UserCardRoles } from '../UserCard';
import UserInfoABACAttributes from './UserInfoABACAttributes';
import UserInfoAvatar from './UserInfoAvatar';

type UserInfoDataProps = Serialized<
	Pick<
		IUser,
		| 'name'
		| 'username'
		| 'nickname'
		| 'bio'
		| 'lastLogin'
		| 'avatarETag'
		| 'utcOffset'
		| 'phone'
		| 'createdAt'
		| 'canViewAllInfo'
		| 'customFields'
		| 'freeSwitchExtension'
		| 'abacAttributes'
	>
>;

export type UserInfoProps = UserInfoDataProps & {
	status: ReactNode;
	customStatus?: ReactNode;
	email?: string;
	verified?: boolean;
	actions: ReactNode;
	roles: ReactNode[];
	reason?: string;
	invitationDate?: string;
};

const UserInfo = ({
	username,
	name,
	lastLogin,
	nickname,
	bio,
	avatarETag,
	roles,
	utcOffset,
	phone,
	email,
	verified,
	createdAt,
	status,
	customStatus,
	customFields,
	canViewAllInfo,
	actions,
	reason,
	freeSwitchExtension,
	abacAttributes,
	invitationDate,
	...props
}: UserInfoProps) => {
    /* Implementation Hidden */
};

export default memo(UserInfo);

```