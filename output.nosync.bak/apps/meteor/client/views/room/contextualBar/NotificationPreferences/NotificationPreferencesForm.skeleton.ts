## File: apps/meteor/client/views/room/contextualBar/NotificationPreferences/NotificationPreferencesForm.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { FieldGroup, IconButton, Margins } from '@rocket.chat/fuselage';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import NotificationByDevice from './components/NotificationByDevice';
import NotificationPreference from './components/NotificationPreference';
import NotificationToggle from './components/NotificationToggle';

type NotificationPreferencesFormProps = {
	notificationOptions: {
		[key: string]: SelectOption[];
	};
	handlePlaySound: () => void;
};

const NotificationPreferencesForm = ({ notificationOptions, handlePlaySound }: NotificationPreferencesFormProps) => {
    /* Implementation Hidden */
};

export default NotificationPreferencesForm;

```