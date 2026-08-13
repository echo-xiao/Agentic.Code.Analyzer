## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoChannels/ContactInfoChannels.tsx

```typescript
import type { ILivechatContact } from '@rocket.chat/core-typings';
import { Box, States, StatesIcon, StatesTitle, Throbber } from '@rocket.chat/fuselage';
import { VirtualizedScrollbars, ContextualbarContent, ContextualbarEmptyContent } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import ContactInfoChannelsItem from './ContactInfoChannelsItem';
import useOutboundProvidersList from '../../../components/outboundMessage/hooks/useOutboundProvidersList';

type ContactInfoChannelsProps = {
	contact: Pick<ILivechatContact, '_id' | 'unknown'>;
};

const ContactInfoChannels = ({ contact }: ContactInfoChannelsProps) => {
    /* Implementation Hidden */
};

export default ContactInfoChannels;

```