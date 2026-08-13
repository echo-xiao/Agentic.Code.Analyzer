## File: packages/ui-video-conf/src/VideoConfController/VideoConfController.stories.tsx

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import VideoConfController from './VideoConfController';

export default {
	component: VideoConfController,
} satisfies Meta<typeof VideoConfController>;

export const Default: StoryObj<typeof VideoConfController> = {
	args: {
		'icon': 'info',
		'aria-label': 'info',
	},
};

```