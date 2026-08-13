## File: apps/meteor/client/components/message/content/ThreadMetricsParticipants.tsx

```typescript
import {
	MessageMetricsItem,
	MessageMetricsItemLabel,
	MessageMetricsItemAvatarRow,
	MessageMetricsItemIcon,
	MessageMetricsItemAvatarRowContent,
} from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useTranslation, useUserPreference } from '@rocket.chat/ui-contexts';

export type ThreadMetricsParticipantsProps = {
	participants: Array<string>;
};

const ThreadMetricsParticipants = ({ participants }: ThreadMetricsParticipantsProps) => {
    /* Implementation Hidden */
};

export default ThreadMetricsParticipants;

```