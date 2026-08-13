## File: apps/meteor/client/views/notAuthorized/NotAuthorizedPage.stories.tsx

```typescript
import type { StoryObj, Meta } from '@storybook/react';

import NotAuthorizedPage from './NotAuthorizedPage';

export default {
	component: NotAuthorizedPage,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof NotAuthorizedPage>;

export const Default: StoryObj<typeof NotAuthorizedPage> = {
	render: () => <NotAuthorizedPage />,
	name: 'NotAuthorizedPage',
};

```