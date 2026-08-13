## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/AppLogsItemEntry.tsx

```typescript
import type { ILogItem } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import DOMPurify from 'dompurify';

import { useHighlightedCode } from '../../../../../hooks/useHighlightedCode';

export type AppLogsItemEntryProps = {
	fullLog: ILogItem;
};

const AppLogsItemEntry = ({ fullLog }: AppLogsItemEntryProps) => {
    /* Implementation Hidden */
};

export default AppLogsItemEntry;

```