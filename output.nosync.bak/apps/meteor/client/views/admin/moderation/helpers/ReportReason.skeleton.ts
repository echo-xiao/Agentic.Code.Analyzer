## File: apps/meteor/client/views/admin/moderation/helpers/ReportReason.tsx

```typescript
import { Box, Tag } from '@rocket.chat/fuselage';

import { useFormatDate } from '../../../../hooks/useFormatDate';

export type ReportReasonProps = { ind: number; uinfo: string | undefined; msg: string; ts: Date };

const ReportReason = ({ ind, uinfo, msg, ts }: ReportReasonProps) => {
    /* Implementation Hidden */
};

export default ReportReason;

```