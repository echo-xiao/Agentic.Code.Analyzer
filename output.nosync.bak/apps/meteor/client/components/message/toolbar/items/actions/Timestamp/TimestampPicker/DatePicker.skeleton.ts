## File: apps/meteor/client/components/message/toolbar/items/actions/Timestamp/TimestampPicker/DatePicker.tsx

```typescript
import { Box, Field, FieldLabel, FieldRow, InputBox } from '@rocket.chat/fuselage';
import { format } from 'date-fns';
import type { ChangeEvent } from 'react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

export type DatePickerProps = {
	value: Date;
	onChange: (date: Date) => void;
};

const DatePicker = ({ value, onChange }: DatePickerProps) => {
    /* Implementation Hidden */
};

export default DatePicker;

```