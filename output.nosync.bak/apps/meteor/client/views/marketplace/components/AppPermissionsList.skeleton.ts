## File: apps/meteor/client/views/marketplace/components/AppPermissionsList.tsx

```typescript
import type { AppPermission } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const defaultPermissions = [
	'user.read',
	'user.write',
	'upload.read',
	'upload.write',
	'ui.interact',
	'server-setting.read',
	'server-setting.write',
	'room.read',
	'room.write',
	'message.read',
	'message.write',
	'livechat-department.read',
	'livechat-department.write',
	'livechat-room.read',
	'livechat-room.write',
	'livechat-message.read',
	'livechat-message.write',
	'livechat-visitor.read',
	'livechat-visitor.write',
	'livechat-status.read',
	'livechat-custom-fields.write',
	'scheduler',
	'networking',
	'persistence',
	'env.read',
	'slashcommand',
	'api',
];

export type AppPermissionsListProps = { appPermissions: AppPermission[] | undefined };

const AppPermissionsList = ({ appPermissions }: AppPermissionsListProps) => {
    /* Implementation Hidden */
};

export default AppPermissionsList;

```