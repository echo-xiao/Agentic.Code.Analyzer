## File: apps/meteor/client/views/omnichannel/reports/hooks/useDefaultDownload.ts

```typescript
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { Period } from '../../../../components/dashboards/periods';
import { formatAttachmentName } from '../utils/formatAttachmentName';
import { formatPeriodRange } from '../utils/formatPeriodRange';

type DefaultDownloadHookProps = {
	columnName: string;
	title: string;
	period: Period['key'];
	data: { rawLabel?: string; label: string; value: number }[];
};

export const useDefaultDownload = ({ columnName, title, period, data }: DefaultDownloadHookProps) => {
    /* Implementation Hidden */
};

```