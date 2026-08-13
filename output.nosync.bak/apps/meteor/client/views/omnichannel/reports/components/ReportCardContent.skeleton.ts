## File: apps/meteor/client/views/omnichannel/reports/components/ReportCardContent.tsx

```typescript
import type { ReactNode } from 'react';

import { ReportCardEmptyState } from './ReportCardEmptyState';
import { ReportCardErrorState } from './ReportCardErrorState';
import { ReportCardLoadingState } from './ReportCardLoadingState';

type ReportCardContentProps = {
	isPending?: boolean;
	isError?: boolean;
	isDataFound?: boolean;
	subtitle?: string;
	onRetry?: () => void;
	children: ReactNode;
};
export const ReportCardContent = ({ isPending, isError, isDataFound, subtitle, onRetry, children }: ReportCardContentProps) => {
    /* Implementation Hidden */
};

```