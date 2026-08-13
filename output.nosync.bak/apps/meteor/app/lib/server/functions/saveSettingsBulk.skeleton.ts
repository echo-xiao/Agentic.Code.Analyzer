## File: apps/meteor/app/lib/server/functions/saveSettingsBulk.ts

```typescript
import type { ISetting, ISettingColor } from '@rocket.chat/core-typings';
import { isSettingCode, isSettingColor } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { disableCustomScripts } from '../../../../server/lib/shared/disableCustomScripts';
import { updateAuditedByUser } from '../../../../server/settings/lib/auditedSettingUpdates';
import { getSettingPermissionId } from '../../../authorization/lib';
import { settings } from '../../../settings/server';
import { checkSettingValueBounds } from '../lib/checkSettingValueBonds';
import { notifyOnSettingChangedById } from '../lib/notifyListener';

const validJSON = Match.Where((value: string) => {
	try {
		value === '' || JSON.parse(value);
		return true;
	} catch (_) {
		throw new Meteor.Error('Invalid JSON provided');
	}
});

const checkInteger = (value: ISetting['value']) => {
    /* Implementation Hidden */
};

export type SaveSettingsAudit = {
	username: string;
	ip: string;
	useragent: string;
};

export const saveSettingsBulk = async (
	uid: string,
	params: { _id: ISetting['_id']; value: ISetting['value']; editor?: ISettingColor['editor'] }[],
	audit: SaveSettingsAudit,
): Promise<void> => {
    /* Implementation Hidden */
};

```