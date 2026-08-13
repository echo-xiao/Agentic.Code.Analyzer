## File: apps/meteor/client/views/marketplace/components/AppInstallModal/AppInstallModal.stories.tsx

```typescript
import type { Meta } from '@storybook/react';

import AppInstallModal from './AppInstallModal';

export default {
	component: AppInstallModal,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof AppInstallModal>;

export const Default = {
	name: 'AppInstallModal',

	args: {
		enabled: 1,
		limit: 3,
		appName: 'Example-app-name',
	},
};

```