## File: apps/meteor/client/views/omnichannel/cannedResponses/RemoveCannedResponseButton.tsx

```typescript
import type { IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import { IconButton } from '@rocket.chat/fuselage';
import { GenericTableCell } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { useRemoveCannedResponse } from './modals/useRemoveCannedResponse';

export type RemoveCannedResponseButtonProps = { id: IOmnichannelCannedResponse['_id'] };

const RemoveCannedResponseButton = ({ id }: RemoveCannedResponseButtonProps) => {
    /* Implementation Hidden */
};

export default RemoveCannedResponseButton;

```