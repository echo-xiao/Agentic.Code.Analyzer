## File: apps/meteor/client/components/message/toolbar/items/actions/Timestamp/TimestampPicker/TimestampPickerModal.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DatePicker from './DatePicker';
import FormatSelector from './FormatSelector';
import Preview from './Preview';
import TimePicker from './TimePicker';
import TimezoneSelector from './TimezoneSelector';
import type { ComposerAPI } from '../../../../../../../lib/chats/ChatAPI';
import { dateToISOString, generateTimestampMarkup } from '../../../../../../../lib/utils/timestamp/conversion';
import type { TimezoneKey, TimestampFormat } from '../../../../../../../lib/utils/timestamp/types';

type TimestampForm = {
	date: Date;
	format: TimestampFormat;
	timezone: TimezoneKey;
};

type TimestampPickerProps = {
	onClose: () => void;
	composer?: ComposerAPI;
};

export const TimestampPickerModal = ({ onClose, composer }: TimestampPickerProps) => {
    /* Implementation Hidden */
};

```