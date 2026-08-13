## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Components/CollapsiblePanel.stories.tsx

```typescript
import type { StoryFn } from '@storybook/react';

import { CollapseButton } from './CollapseButton';
import { CollapsiblePanel } from './CollapsiblePanel';
import { CollapsibleRegion } from './CollapsibleRegion';

export default {
	component: CollapsiblePanel,
	args: {
		expanded: true,
	},
	parameters: {
		layout: 'centered',
	},
};

const Template: StoryFn = (args) => {
    /* Implementation Hidden */
};

export const Default = {
	render: Template,
};

```