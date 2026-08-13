## File: apps/meteor/client/lib/chats/flows/uploadFiles.ts

```typescript
import { t } from '../../../../app/utils/lib/i18n';
import { MAX_MULTIPLE_UPLOADED_FILES } from '../../../../lib/constants';
import { e2e } from '../../e2ee';
import { settings } from '../../settings';
import { dispatchToastMessage } from '../../toast';
import type { ChatAPI } from '../ChatAPI';

export const uploadFiles = async (
	chat: ChatAPI,
	{ files, resetFileInput }: { files: readonly File[]; resetFileInput?: () => void },
): Promise<void> => {
    /* Implementation Hidden */
};

```