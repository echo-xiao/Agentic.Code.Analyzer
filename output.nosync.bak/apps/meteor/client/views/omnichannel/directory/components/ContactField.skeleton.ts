## File: apps/meteor/client/views/omnichannel/directory/components/ContactField.tsx

```typescript
import type { IOmnichannelGenericRoom, IVisitor } from '@rocket.chat/core-typings';
import { Avatar, Box } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { FormSkeleton } from './FormSkeleton';
import { UserStatus } from '../../../../components/UserStatus';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';
import AgentInfoDetails from '../../components/AgentInfoDetails';
import Field from '../../components/Field';
import Info from '../../components/Info';
import Label from '../../components/Label';

type ContactFieldProps = {
	contact: IVisitor;
	room: IOmnichannelGenericRoom;
};

const ContactField = ({ contact, room }: ContactFieldProps) => {
    /* Implementation Hidden */
};

export default ContactField;

```