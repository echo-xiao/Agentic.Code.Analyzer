## File: apps/meteor/client/views/account/preferences/PreferencesNotificationsSection.tsx

```typescript
import type { INotificationDesktop } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { AccordionItem, Button } from '@rocket.chat/fuselage';
import { Field, FieldGroup, FieldHint, FieldLabel, FieldRow, Select, ToggleSwitch } from '@rocket.chat/fuselage-forms';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useSetting, useUserPreference, useUser } from '@rocket.chat/ui-contexts';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNotification } from '../../../hooks/notification/useNotification';

const notificationOptionsLabelMap = {
	all: 'All_messages',
	mentions: 'Mentions',
	nothing: 'Nothing',
};

const emailNotificationOptionsLabelMap = {
	mentions: 'Email_Notification_Mode_All',
	nothing: 'Email_Notification_Mode_Disabled',
};

const PreferencesNotificationsSection = () => {
    /* Implementation Hidden */
};

export default PreferencesNotificationsSection;

```