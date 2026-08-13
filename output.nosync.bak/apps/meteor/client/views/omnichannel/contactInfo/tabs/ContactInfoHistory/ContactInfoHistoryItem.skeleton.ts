## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoHistory/ContactInfoHistoryItem.tsx

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import {
	Box,
	Palette,
	IconButton,
	Icon,
	MessageGenericPreview,
	MessageGenericPreviewContent,
	MessageGenericPreviewDescription,
	MessageGenericPreviewTitle,
} from '@rocket.chat/fuselage';
import type { ContactSearchChatsResult } from '@rocket.chat/rest-typings';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { OmnichannelRoomIcon } from '../../../../../components/RoomIcon/OmnichannelRoomIcon';
import { useHasLicenseModule } from '../../../../../hooks/useHasLicenseModule';
import { usePreventPropagation } from '../../../../../hooks/usePreventPropagation';
import { useTimeFromNow } from '../../../../../hooks/useTimeFromNow';
import { useOmnichannelSource } from '../../../hooks/useOmnichannelSource';
import AdvancedContactModal from '../../AdvancedContactModal';

type ContactInfoHistoryItemProps = Serialized<ContactSearchChatsResult> & {
	onClick: () => void;
};

const ContactInfoHistoryItem = ({ source, lastMessage, verified, onClick }: ContactInfoHistoryItemProps) => {
    /* Implementation Hidden */
};

export default ContactInfoHistoryItem;

```