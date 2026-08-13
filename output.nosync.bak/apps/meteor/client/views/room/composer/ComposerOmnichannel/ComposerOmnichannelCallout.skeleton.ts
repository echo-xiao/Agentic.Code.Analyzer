## File: apps/meteor/client/views/room/composer/ComposerOmnichannel/ComposerOmnichannelCallout.tsx

```typescript
import { Button, ButtonGroup, Callout, IconButton } from '@rocket.chat/fuselage';
import { useSessionStorage } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { isSameChannel } from '../../../../../app/livechat/lib/isSameChannel';
import { useBlockChannel } from '../../../omnichannel/contactInfo/tabs/ContactInfoChannels/useBlockChannel';
import { useOmnichannelRoom } from '../../contexts/RoomContext';

const ComposerOmnichannelCallout = () => {
    /* Implementation Hidden */
};

export default ComposerOmnichannelCallout;

```