## File: apps/meteor/client/components/message/toolbar/items/actions/Timestamp/TimestampPicker/FormatSelector.tsx

```typescript
import { Box, Field, FieldLabel, FieldRow, Select } from '@rocket.chat/fuselage';
import type { Key } from 'react';
import { useTranslation } from 'react-i18next';

import { TIMESTAMP_FORMATS } from '../../../../../../../lib/utils/timestamp/formats';
import type { TimestampFormat, ITimestampFormatConfig } from '../../../../../../../lib/utils/timestamp/types';

export type FormatSelectorProps = {
	value: TimestampFormat;
	onChange: (format: TimestampFormat) => void;
};

const FormatSelector = ({ value, onChange }: FormatSelectorProps) => {
    /* Implementation Hidden */
};

export default FormatSelector;

```