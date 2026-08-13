## File: apps/uikit-playground/src/Components/ScreenThumbnail/CreateNewScreenButton.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Icon, Box } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

const CreateNewScreenButton = ({
	size = '60px',
	name = 'plus',
	...props
}: {
	size?: ComponentProps<typeof Icon>['size'];
} & ComponentProps<typeof Icon>) => {
    /* Implementation Hidden */
};

export default CreateNewScreenButton;

```