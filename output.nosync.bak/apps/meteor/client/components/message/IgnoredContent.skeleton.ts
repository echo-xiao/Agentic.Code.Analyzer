## File: apps/meteor/client/components/message/IgnoredContent.tsx

```typescript
import { Box, Icon, MessageBody } from '@rocket.chat/fuselage';
import type { SyntheticEvent } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export type IgnoredContentProps = {
	messageId: string;
	onShowMessageIgnored: () => void;
};

const IgnoredContent = ({ messageId, onShowMessageIgnored }: IgnoredContentProps) => {
    /* Implementation Hidden */
};

export default memo(IgnoredContent);

```