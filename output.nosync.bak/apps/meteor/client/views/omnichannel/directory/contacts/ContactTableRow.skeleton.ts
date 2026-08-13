## File: apps/meteor/client/views/omnichannel/directory/contacts/ContactTableRow.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { ILivechatContactWithManagerData } from '@rocket.chat/rest-typings';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';

import ContactItemMenu from './ContactItemMenu';
import { OmnichannelRoomIcon } from '../../../../components/RoomIcon/OmnichannelRoomIcon';
import { useTimeFromNow } from '../../../../hooks/useTimeFromNow';
import { useOmnichannelSource } from '../../hooks/useOmnichannelSource';
import { useOmnichannelDirectoryRouter } from '../hooks/useOmnichannelDirectoryRouter';

const ContactTableRow = ({ _id, name, contactManager, lastChat, channels }: ILivechatContactWithManagerData) => {
    /* Implementation Hidden */
};

export default ContactTableRow;

```