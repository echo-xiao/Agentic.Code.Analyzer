## File: packages/livechat/src/lib/transcript.ts

```typescript
import i18next from 'i18next';

import { Livechat } from '../api';
import { ModalManager } from '../components/Modal';
import store from '../store';

const promptTranscript = async () => {
    /* Implementation Hidden */
};

const transcriptSentAlert = (message: string) =>
	ModalManager.alert({
		text: message,
		timeout: 1000,
	});

export const handleTranscript = async () => {
    /* Implementation Hidden */
};

```