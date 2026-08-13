## File: apps/meteor/client/views/outlookCalendar/OutlookSettingsList/OutlookSettingItem.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Button, Palette } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

type OutlookSettingItemProps = {
	id: string;
	title: string;
	subTitle: string;
	enabled: boolean;
	handleEnable: (value: boolean) => void;
};

const OutlookSettingItem = ({ id, title, subTitle, enabled, handleEnable }: OutlookSettingItemProps) => {
    /* Implementation Hidden */
};

export default OutlookSettingItem;

```