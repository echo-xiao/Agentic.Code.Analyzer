## File: apps/meteor/client/components/message/toolbar/items/actions/Timestamp/TimestampPicker/TimezoneSelector.tsx

```typescript
import { Box, Field, FieldHint, FieldDescription, FieldLabel, FieldRow, Select } from '@rocket.chat/fuselage';
import type { Key } from 'react';
import { useTranslation } from 'react-i18next';

import { UTCOffsets } from '../../../../../../../lib/utils/timestamp/types';
import type { TimezoneKey } from '../../../../../../../lib/utils/timestamp/types';

export type TimezoneSelectorProps = {
	value: TimezoneKey;
	onChange: (timezone: TimezoneKey) => void;
};

const TimezoneSelector = ({ value, onChange }: TimezoneSelectorProps) => {
    /* Implementation Hidden */
};

export default TimezoneSelector;

```