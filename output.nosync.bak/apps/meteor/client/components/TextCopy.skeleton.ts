## File: apps/meteor/client/components/TextCopy.tsx

```typescript
import { Box, Button, Scrollable } from '@rocket.chat/fuselage';
import type { ComponentProps, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import useClipboardWithToast from '../hooks/useClipboardWithToast';

const defaultWrapperRenderer = (text: string) => (
	<Box fontFamily='mono' alignSelf='center' fontScale='p2' style={{ wordBreak: 'break-all' }} mie={4} flexGrow={1} maxHeight='x108'>
		{text}
	</Box>
);

export type TextCopyProps = {
	text: string;
	wrapper?: (text: string) => ReactNode;
} & ComponentProps<typeof Box>;

const TextCopy = ({ text, wrapper = defaultWrapperRenderer, ...props }: TextCopyProps) => {
    /* Implementation Hidden */
};

export default TextCopy;

```