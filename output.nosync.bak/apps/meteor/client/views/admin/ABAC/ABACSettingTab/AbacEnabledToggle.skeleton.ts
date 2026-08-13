## File: apps/meteor/client/views/admin/ABAC/ABACSettingTab/AbacEnabledToggle.tsx

```typescript
import type { SettingValue } from '@rocket.chat/core-typings';
import { useSetModal, useSettingsDispatch } from '@rocket.chat/ui-contexts';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import WarningModal from './WarningModal';
import type { EditableSetting } from '../../EditableSettingsContext';
import { useEditableSetting } from '../../EditableSettingsContext';
import MemoizedSetting from '../../settings/Setting/MemoizedSetting';
import SettingSkeleton from '../../settings/Setting/SettingSkeleton';

export type ABACEnabledToggleProps = {
	hasABAC: 'loading' | boolean;
	className?: string;
};

const ABACEnabledToggle = ({ className, hasABAC }: ABACEnabledToggleProps) => {
    /* Implementation Hidden */
};
export default ABACEnabledToggle;

```