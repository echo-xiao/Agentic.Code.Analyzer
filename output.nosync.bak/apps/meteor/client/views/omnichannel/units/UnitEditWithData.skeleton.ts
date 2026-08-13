## File: apps/meteor/client/views/omnichannel/units/UnitEditWithData.tsx

```typescript
import type { IOmnichannelBusinessUnit } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { ContextualbarSkeletonBody } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import UnitEdit from './UnitEdit';
import { useRemoveUnit } from './useRemoveUnit';

const UnitEditWithData = ({ unitId, onClose }: { unitId: IOmnichannelBusinessUnit['_id']; onClose: () => void }) => {
    /* Implementation Hidden */
};

export default UnitEditWithData;

```