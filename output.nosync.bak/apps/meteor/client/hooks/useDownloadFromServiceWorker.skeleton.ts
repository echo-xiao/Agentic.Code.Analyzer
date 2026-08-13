## File: apps/meteor/client/hooks/useDownloadFromServiceWorker.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';
import type { TFunction } from 'i18next';
import type { MouseEvent } from 'react';
import { useId, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { downloadAs } from '../lib/download';

const ee = new Emitter<Record<string, { result: ArrayBuffer; id: string }>>();

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.addEventListener('message', (event) => {
		if (event.data.type === 'attachment-download-result') {
			const { result } = event.data as { result: ArrayBuffer; id: string };

			ee.emit(event.data.id, { result, id: event.data.id });
		}
	});
}

export const registerDownloadForUid = (uid: string, t: TFunction, title?: string) => {
    /* Implementation Hidden */
};

export const forAttachmentDownload = (uid: string, href: string, controller?: ServiceWorker | null) => {
    /* Implementation Hidden */
};

export const useDownloadFromServiceWorker = (href: string, title?: string) => {
    /* Implementation Hidden */
};

```