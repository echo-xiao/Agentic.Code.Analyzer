## File: apps/meteor/client/views/room/body/RetentionPolicyWarning.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Box, Bubble } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { withErrorBoundary } from '../../../components/withErrorBoundary';
import { usePruneWarningMessage } from '../../../hooks/usePruneWarningMessage';

const RetentionPolicyWarning = ({ room }: { room: IRoom }) => {
    /* Implementation Hidden */
};

export default withErrorBoundary(RetentionPolicyWarning);

```