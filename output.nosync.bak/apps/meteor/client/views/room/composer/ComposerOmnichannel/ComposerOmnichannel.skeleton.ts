## File: apps/meteor/client/views/room/composer/ComposerOmnichannel/ComposerOmnichannel.tsx

```typescript
import { MessageFooterCallout } from '@rocket.chat/ui-composer';
import { useUserId } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useIsRoomOverMacLimit } from '../../../omnichannel/hooks/useIsRoomOverMacLimit';
import { useOmnichannelRoom, useUserIsSubscribed } from '../../contexts/RoomContext';
import type { ComposerMessageProps } from '../ComposerMessage';
import ComposerMessage from '../ComposerMessage';
import ComposerOmnichannelCallout from './ComposerOmnichannelCallout';
import { ComposerOmnichannelInquiry } from './ComposerOmnichannelInquiry';
import { ComposerOmnichannelJoin } from './ComposerOmnichannelJoin';
import { ComposerOmnichannelOnHold } from './ComposerOmnichannelOnHold';

const ComposerOmnichannel = (props: ComposerMessageProps) => {
    /* Implementation Hidden */
};

export default ComposerOmnichannel;

```