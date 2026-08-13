## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoHistory/ContactInfoHistory.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { OmnichannelSourceType } from '@rocket.chat/core-typings';
import { Box, Margins, Throbber, States, StatesIcon, StatesTitle, Select } from '@rocket.chat/fuselage';
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import { VirtualizedScrollbars, ContextualbarContent, ContextualbarEmptyContent } from '@rocket.chat/ui-client';
import { useEndpoint, useSetModal } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { Key } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import ContactInfoHistoryItem from './ContactInfoHistoryItem';
import { useHasLicenseModule } from '../../../../../hooks/useHasLicenseModule';
import { useOmnichannelSource } from '../../../hooks/useOmnichannelSource';
import AdvancedContactModal from '../../AdvancedContactModal';

type ContactInfoHistoryProps = {
	contact: Serialized<ILivechatContact>;
	setChatId: (chatId: string) => void;
};

const isFilterBlocked = (hasLicense: boolean, fieldValue: Key) => !hasLicense && fieldValue !== 'all';

const ContactInfoHistory = ({ contact, setChatId }: ContactInfoHistoryProps) => {
    /* Implementation Hidden */
};

export default ContactInfoHistory;

```