## File: apps/meteor/client/views/marketplace/AppsList/AppsList.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { Box, CardGroup } from '@rocket.chat/fuselage';

import AppRow from './AppRow';

export type AppsListProps = {
	apps: App[];
	title?: string;
	appsListId: string;
};

const AppsList = ({ apps, title, appsListId }: AppsListProps) => {
    /* Implementation Hidden */
};

export default AppsList;

```