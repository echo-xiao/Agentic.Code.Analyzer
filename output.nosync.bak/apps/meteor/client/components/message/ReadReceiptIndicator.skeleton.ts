## File: apps/meteor/client/components/message/ReadReceiptIndicator.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Box, Icon } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

export type ReadReceiptIndicatorProps = {
	mid: IMessage['_id'];
	unread?: boolean;
};

const ReadReceiptIndicator = ({ mid, unread }: ReadReceiptIndicatorProps) => {
    /* Implementation Hidden */
};

export default ReadReceiptIndicator;

```