## File: apps/meteor/client/views/omnichannel/contactInfo/ContactInfo/ContactInfo.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup, Callout, IconButton, Tabs, TabsItem } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import {
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { usePermission, useRouteParameter, useSetModal } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import ReviewContactModal from './ReviewContactModal';
import { useFormatDate } from '../../../../hooks/useFormatDate';
import { useContactRoute } from '../../hooks/useContactRoute';
import { useValidCustomFields } from '../hooks/useValidCustomFields';
import ContactInfoChannels from '../tabs/ContactInfoChannels';
import ContactInfoDetails from '../tabs/ContactInfoDetails';
import ContactInfoHistory from '../tabs/ContactInfoHistory';

type ContactInfoProps = {
	contact: Serialized<ILivechatContact>;
	onClose: () => void;
};

const ContactInfo = ({ contact, onClose }: ContactInfoProps) => {
    /* Implementation Hidden */
};

export default ContactInfo;

```