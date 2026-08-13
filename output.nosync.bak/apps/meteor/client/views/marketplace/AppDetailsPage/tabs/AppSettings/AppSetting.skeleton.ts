## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppSettings/AppSetting.tsx

```typescript
import type { ISettingSelectValue } from '@rocket.chat/apps-engine/definition/settings';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings/ISetting';
import { useRouteParameter } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import MarkdownText from '../../../../../components/MarkdownText';
import MemoizedSetting from '../../../../admin/settings/Setting/MemoizedSetting';
import { useAppTranslation } from '../../../hooks/useAppTranslation';

const AppSetting = ({ id, type, i18nLabel, i18nDescription, values, value, packageValue, ...props }: ISetting) => {
    /* Implementation Hidden */
};

export default AppSetting;

```