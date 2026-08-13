## File: apps/meteor/client/views/admin/settings/SettingsGroupSelector/SettingsGroupSelector.tsx

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { useSettingStructure } from '@rocket.chat/ui-contexts';

import SettingsGroupPageSkeleton from '../SettingsGroupPage/SettingsGroupPageSkeleton';
import BaseGroupPage from '../groups/BaseGroupPage';
import EnterpriseGroupPage from '../groups/EnterpriseGroupPage';
import LDAPGroupPage from '../groups/LDAPGroupPage';
import OAuthGroupPage from '../groups/OAuthGroupPage';

export type SettingsGroupSelectorProps = {
	groupId: ISetting['_id'];
	onClickBack?: () => void;
};

const SettingsGroupSelector = ({ groupId, onClickBack }: SettingsGroupSelectorProps) => {
    /* Implementation Hidden */
};

export default SettingsGroupSelector;

```