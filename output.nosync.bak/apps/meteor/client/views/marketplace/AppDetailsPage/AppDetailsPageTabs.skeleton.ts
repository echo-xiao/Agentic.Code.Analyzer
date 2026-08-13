## File: apps/meteor/client/views/marketplace/AppDetailsPage/AppDetailsPageTabs.tsx

```typescript
import { Tabs, TabsItem } from '@rocket.chat/fuselage';
import { usePermission, useRouter } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import type { ISettings } from '../../../apps/@types/IOrchestrator';

export type AppDetailsPageTabsProps = {
	context: string;
	installed: boolean | undefined;
	isSecurityVisible: boolean;
	settings: ISettings | undefined;
	tab: string | undefined;
	hasCluster: boolean;
};

const AppDetailsPageTabs = ({
	context,
	installed = false,
	isSecurityVisible,
	settings,
	tab,
	hasCluster = false,
}: AppDetailsPageTabsProps) => {
    /* Implementation Hidden */
};

export default AppDetailsPageTabs;

```