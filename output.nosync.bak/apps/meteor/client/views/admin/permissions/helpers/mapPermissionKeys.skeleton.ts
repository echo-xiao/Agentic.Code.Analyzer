## File: apps/meteor/client/views/admin/permissions/helpers/mapPermissionKeys.ts

```typescript
import type { IPermission } from '@rocket.chat/core-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { TFunction } from 'i18next';

export const mapPermissionKeys = ({ t, permissions }: { t: TFunction; permissions: IPermission[] }) =>
	permissions.map(({ _id, settingId, group, section }) => ({
		_id,
		i18nLabels: [group && t(group), section && t(section), settingId && t(settingId), t(_id)].filter(Boolean) as string[],
	}));

export const filterPermissionKeys = (permissionKeys: { _id: string; i18nLabels: string[] }[], filter: string): string[] => {
    /* Implementation Hidden */
};

```