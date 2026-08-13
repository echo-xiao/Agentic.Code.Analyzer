## File: apps/meteor/client/views/omnichannel/businessHours/BusinessHoursRow.tsx

```typescript
import type { ILivechatBusinessHour, Serialized } from '@rocket.chat/core-typings';
import { IconButton } from '@rocket.chat/fuselage';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useRouter } from '@rocket.chat/ui-contexts';
import type { KeyboardEvent } from 'react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRemoveBusinessHour } from './useRemoveBusinessHour';

const BusinessHoursRow = ({ _id, name, timezone, workHours, active, type }: Serialized<ILivechatBusinessHour>) => {
    /* Implementation Hidden */
};

export default memo(BusinessHoursRow);

```