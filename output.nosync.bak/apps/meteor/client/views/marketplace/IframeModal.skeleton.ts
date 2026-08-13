## File: apps/meteor/client/views/marketplace/IframeModal.tsx

```typescript
import { Box, Modal } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const iframeMsgListener = (confirm: (data: any) => void, cancel: () => void) => (e: MessageEvent<any>) => {
	let data;
	try {
		data = JSON.parse(e.data);
	} catch (e) {
		return;
	}

	data.result ? confirm(data) : cancel();
};

export type IframeModalProps = {
	url: string;
	confirm: (data: any) => void;
	cancel: () => void;
	wrapperHeight?: string;
} & ComponentProps<typeof Modal>;

const IframeModal = ({ url, confirm, cancel, wrapperHeight = 'x360', ...props }: IframeModalProps) => {
    /* Implementation Hidden */
};

export default IframeModal;

```