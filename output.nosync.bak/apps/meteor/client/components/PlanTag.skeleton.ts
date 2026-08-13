## File: apps/meteor/client/components/PlanTag.tsx

```typescript
import { Box, Tag } from '@rocket.chat/fuselage';
import { isTruthy } from '@rocket.chat/tools';
import { useLicense } from '@rocket.chat/ui-client';

const developmentTag = process.env.NODE_ENV === 'development' ? 'Development' : null;
function PlanTag() {
    /* Implementation Hidden */
}

export default PlanTag;

```