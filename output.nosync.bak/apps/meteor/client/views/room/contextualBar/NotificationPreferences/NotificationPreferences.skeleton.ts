## File: apps/meteor/client/views/room/contextualBar/NotificationPreferences/NotificationPreferences.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Button, ButtonGroup } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarScrollableContent,
	ContextualbarFooter,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import NotificationPreferencesForm from './NotificationPreferencesForm';

type NotificationPreferencesProps = {
	handleClose: () => void;
	handleSave: () => void;
	notificationOptions: {
		[key: string]: SelectOption[];
	};
	handlePlaySound: () => void;
};

const NotificationPreferences = ({ handleClose, handleSave, notificationOptions, handlePlaySound }: NotificationPreferencesProps) => {
    /* Implementation Hidden */
};

export default NotificationPreferences;

```