## File: apps/meteor/client/views/room/body/DropTargetOverlay.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { DragEvent, ReactNode } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatDateAndTime } from '../../../hooks/useFormatDateAndTime';

type DropTargetOverlayProps = {
	enabled: boolean;
	reason?: ReactNode;
	onFileDrop?: (files: File[]) => void;
	visible?: boolean;
	onDismiss?: () => void;
};

function DropTargetOverlay({ enabled, reason, onFileDrop, visible = true, onDismiss }: DropTargetOverlayProps) {
    /* Implementation Hidden */
}

export default memo(DropTargetOverlay);

```