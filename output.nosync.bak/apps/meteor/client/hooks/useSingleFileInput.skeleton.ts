## File: apps/meteor/client/hooks/useSingleFileInput.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRef, useEffect } from 'react';

export const useSingleFileInput = (
	onSetFile: (file: File, formData: FormData) => void,
	fileType = 'image/*',
	fileField = 'image',
	maxSize?: number,
	onError?: () => void,
): [onClick: () => void, reset: () => void] => {
    /* Implementation Hidden */
};

```