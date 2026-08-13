## File: packages/livechat/src/components/uiKit/message/DatePickerElement/index.tsx

```typescript
import type * as uikit from '@rocket.chat/ui-kit';
import type { ChangeEvent } from 'preact/compat';
import { memo, useCallback } from 'preact/compat';

import DateInput from '../../../Form/DateInput';
import { usePerformAction } from '../Block';

type DatePickerElementProps = uikit.DatePickerElement;

const DatePickerElement = ({ actionId, confirm /* , placeholder */, initialDate /* , parser */ }: DatePickerElementProps) => {
    /* Implementation Hidden */
};

export default memo(DatePickerElement);

```