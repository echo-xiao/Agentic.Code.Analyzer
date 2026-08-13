## File: apps/meteor/client/views/room/body/hooks/useDropTarget.ts

```typescript
import type { DragEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

const hasFilesToUpload = (dataTransfer: DataTransfer): boolean => dataTransfer.types.includes('Files');

const hasURLToUpload = (dataTransfer: DataTransfer): boolean =>
	dataTransfer.types.includes('text/uri-list') && dataTransfer.types.includes('text/html');

export const useDropTarget = (): {
	triggerProps: {
		onDragEnter: (event: DragEvent<Element>) => void;
	};
	overlayProps: {
		visible: boolean;
		onDismiss: () => void;
	};
} => {
    /* Implementation Hidden */
};

```