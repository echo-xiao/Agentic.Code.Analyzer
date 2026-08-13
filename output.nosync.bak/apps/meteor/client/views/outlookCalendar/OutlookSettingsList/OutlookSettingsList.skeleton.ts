## File: apps/meteor/client/views/outlookCalendar/OutlookSettingsList/OutlookSettingsList.tsx

```typescript
import { ButtonGroup, Button } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarFooter,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useTranslation, useUserPreference, useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import OutlookSettingItem from './OutlookSettingItem';
import { useOutlookAuthentication, useOutlookAuthenticationMutationLogout } from '../hooks/useOutlookAuthentication';

type OutlookSettingsListProps = {
	onClose: () => void;
	changeRoute: () => void;
};

const OutlookSettingsList = ({ onClose, changeRoute }: OutlookSettingsListProps) => {
    /* Implementation Hidden */
};

export default OutlookSettingsList;

```