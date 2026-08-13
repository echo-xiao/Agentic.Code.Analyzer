## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessagePreview/PreviewItem.tsx

```typescript
import { Box, Icon } from '@rocket.chat/fuselage';
import type { Keys } from '@rocket.chat/icons';
import type { ReactNode } from 'react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

type PreviewItemProps = {
	label: string;
	icon: Keys;
	children: ReactNode;
};

const PreviewItem = ({ icon, label, children }: PreviewItemProps) => {
    /* Implementation Hidden */
};

export default PreviewItem;

```