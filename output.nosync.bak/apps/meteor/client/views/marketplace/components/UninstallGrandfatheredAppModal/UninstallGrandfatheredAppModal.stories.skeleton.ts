## File: apps/meteor/client/views/marketplace/components/UninstallGrandfatheredAppModal/UninstallGrandfatheredAppModal.stories.tsx

```typescript
import type { Meta } from '@storybook/react';

import UninstallGrandfatheredAppModal from './UninstallGrandfatheredAppModal';

export default {
	component: UninstallGrandfatheredAppModal,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof UninstallGrandfatheredAppModal>;

export const Default = {
	name: 'UninstallGrandfatheredAppModal',

	args: {
		appName: 'Example-App-Name',
	},
};

```