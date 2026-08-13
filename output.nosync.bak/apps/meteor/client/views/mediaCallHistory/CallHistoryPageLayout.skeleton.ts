## File: apps/meteor/client/views/mediaCallHistory/CallHistoryPageLayout.tsx

```typescript
import { Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import CallHistoryPageFilters, { type CallHistoryPageFiltersProps } from './CallHistoryPageFilters';

export type CallHistoryPageLayoutProps = {
	children: ReactNode;
	contextualBar?: ReactNode;
	filterProps: CallHistoryPageFiltersProps;
};

const CallHistoryPageLayout = ({ children, contextualBar, filterProps }: CallHistoryPageLayoutProps) => {
    /* Implementation Hidden */
};

export default CallHistoryPageLayout;

```