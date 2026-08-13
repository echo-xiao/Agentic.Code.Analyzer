## File: apps/meteor/app/file-upload/server/lib/ranges.ts

```typescript
import type http from 'node:http';

import type { IUpload } from '@rocket.chat/core-typings';

function getByteRange(header?: string) {
    /* Implementation Hidden */
}

export function getFileRange(file: IUpload, req: http.IncomingMessage) {
    /* Implementation Hidden */
}

// code from: https://github.com/jalik/jalik-ufs/blob/master/ufs-server.js#L310
export const setRangeHeaders = function (
	range: { start: number; stop: number; outOfRange?: boolean } | undefined,
	file: IUpload,
	res: http.ServerResponse,
) {
    /* Implementation Hidden */
};

```