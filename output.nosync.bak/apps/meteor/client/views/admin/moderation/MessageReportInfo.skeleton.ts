## File: apps/meteor/client/views/admin/moderation/MessageReportInfo.tsx

```typescript
import type { IModerationReport } from '@rocket.chat/core-typings';
import { Box, Message } from '@rocket.chat/fuselage';
import { useEndpoint, useSetting } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import ReportReason from './helpers/ReportReason';

export type MessageReportInfoProps = { msgId: string };

const MessageReportInfo = ({ msgId }: MessageReportInfoProps) => {
    /* Implementation Hidden */
};

export default MessageReportInfo;

```