## File: packages/ui-voip/src/components/CallHistoryExternalUser.tsx

```typescript
import { Box, Icon, FramedIcon } from '@rocket.chat/fuselage';

import type { CallHistoryExternalContact } from '../definitions';

type CallHistoryExternalUserProps = {
	contact: CallHistoryExternalContact;
	showIcon?: boolean;
};

const CallHistoryExternalUser = ({ contact: { number }, showIcon = true }: CallHistoryExternalUserProps) => {
    /* Implementation Hidden */
};

export default CallHistoryExternalUser;

```