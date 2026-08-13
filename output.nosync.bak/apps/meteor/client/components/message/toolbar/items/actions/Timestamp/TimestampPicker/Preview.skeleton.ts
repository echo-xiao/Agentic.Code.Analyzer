## File: apps/meteor/client/components/message/toolbar/items/actions/Timestamp/TimestampPicker/Preview.tsx

```typescript
import { Box, Field, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { Markup } from '@rocket.chat/gazzodown';
import { parse } from '@rocket.chat/message-parser';
import { useTranslation } from 'react-i18next';

import { dateToISOString, generateTimestampMarkup } from '../../../../../../../lib/utils/timestamp/conversion';
import type { TimestampFormat, TimezoneKey } from '../../../../../../../lib/utils/timestamp/types';
import GazzodownText from '../../../../../../GazzodownText';

export type PreviewProps = {
	date: Date;
	format: TimestampFormat;
	timezone: TimezoneKey;
};

const Preview = ({ date, format, timezone }: PreviewProps) => {
    /* Implementation Hidden */
};

export default Preview;

```