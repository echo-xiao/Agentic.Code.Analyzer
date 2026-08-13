## File: apps/meteor/client/views/composer/EmojiPicker/ToneSelector/ToneSelectorWrapper.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

export type ToneSelectorWrapperProps = {
	caption: string;
} & Omit<ComponentPropsWithoutRef<typeof Box>, 'caption'>;

const ToneSelectorWrapper = ({ caption, children, ...props }: ToneSelectorWrapperProps) => {
    /* Implementation Hidden */
};

export default ToneSelectorWrapper;

```