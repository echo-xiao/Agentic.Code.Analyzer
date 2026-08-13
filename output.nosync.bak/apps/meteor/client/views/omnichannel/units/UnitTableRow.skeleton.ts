## File: apps/meteor/client/views/omnichannel/units/UnitTableRow.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useRemoveUnit } from './useRemoveUnit';

const UnitsTableRow = ({ _id, name, visibility }: { _id: string; name: string; visibility: string }) => {
    /* Implementation Hidden */
};

export default UnitsTableRow;

```