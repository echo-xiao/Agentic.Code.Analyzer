## File: apps/meteor/client/views/room/webdav/WebdavFilePickerModal/lib/getNodeIconType.ts

```typescript
import type { Keys as IconName } from '@rocket.chat/icons';

// TODO: This function should be simplified, it only needs to return the icon name
export const getNodeIconType = (
	basename: string,
	fileType: string,
	mime?: string,
): { icon: IconName; type: string; extension?: string } => {
    /* Implementation Hidden */
};

```