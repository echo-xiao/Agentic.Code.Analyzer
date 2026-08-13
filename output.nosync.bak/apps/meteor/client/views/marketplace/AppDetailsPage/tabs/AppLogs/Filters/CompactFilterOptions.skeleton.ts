## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/CompactFilterOptions.tsx

```typescript
import { GenericMenu } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

export type CompactFilterOptionsProps = {
	onExpandAll: () => void;
	onCollapseAll: () => void;
	onRefreshLogs: () => void;
	onExportLogs: () => void;
	isLoading: boolean;
};

const CompactFilterOptions = ({
	onExportLogs,
	onExpandAll,
	onCollapseAll,
	onRefreshLogs,
	isLoading,
	...props
}: CompactFilterOptionsProps) => {
    /* Implementation Hidden */
};

export default CompactFilterOptions;

```