## File: apps/meteor/client/views/omnichannel/directory/contacts/ContactItemMenu.tsx

```typescript
import type { ILivechatContactChannel } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useSetModal, usePermission } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import RemoveContactModal from './RemoveContactModal';
import { useOmnichannelDirectoryRouter } from '../hooks/useOmnichannelDirectoryRouter';

type ContactItemMenuProps = {
	_id: string;
	name: string;
	channels: ILivechatContactChannel[];
};

const ContactItemMenu = ({ _id, name, channels }: ContactItemMenuProps) => {
    /* Implementation Hidden */
};

export default ContactItemMenu;

```