## File: apps/meteor/client/components/message/notification/MessageNotification.tsx

```typescript
import type { Palette } from '@rocket.chat/fuselage';
import { Box } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

export type MessageNotificationProps = {
	label: TranslationKey;
	bg: keyof (typeof Palette)['badge'];
};

const MessageNotification = ({ label, bg }: MessageNotificationProps) => {
    /* Implementation Hidden */
};

export default MessageNotification;

```