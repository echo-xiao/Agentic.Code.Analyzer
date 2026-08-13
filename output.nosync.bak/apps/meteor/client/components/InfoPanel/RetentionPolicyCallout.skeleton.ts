## File: apps/meteor/client/components/InfoPanel/RetentionPolicyCallout.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { usePruneWarningMessage } from '../../hooks/usePruneWarningMessage';
import { withErrorBoundary } from '../withErrorBoundary';

export type RetentionPolicyCalloutProps = { room: IRoom };

const RetentionPolicyCallout = ({ room }: RetentionPolicyCalloutProps) => {
    /* Implementation Hidden */
};

export default withErrorBoundary(RetentionPolicyCallout);

```