## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoChannels/ContactInfoChannelsItem.tsx

```typescript
import type { ILivechatContact, ILivechatContactChannel, Serialized } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, Palette } from '@rocket.chat/fuselage';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useBlockChannel } from './useBlockChannel';
import { OmnichannelRoomIcon } from '../../../../../components/RoomIcon/OmnichannelRoomIcon';
import { useTimeFromNow } from '../../../../../hooks/useTimeFromNow';
import { useOutboundMessageModal } from '../../../components/outboundMessage/modals/OutboundMessageModal';
import { useVisitorInfo } from '../../../directory/hooks/useVisitorInfo';
import { useOmnichannelSource } from '../../../hooks/useOmnichannelSource';

type ContactInfoChannelsItemProps = Serialized<ILivechatContactChannel> & {
	contact?: Pick<ILivechatContact, '_id' | 'unknown'>;
	canSendOutboundMessage?: boolean;
};

const ContactInfoChannelsItem = ({
	contact,
	visitor,
	details,
	blocked,
	lastChat,
	canSendOutboundMessage,
}: ContactInfoChannelsItemProps) => {
    /* Implementation Hidden */
};

export default ContactInfoChannelsItem;

```