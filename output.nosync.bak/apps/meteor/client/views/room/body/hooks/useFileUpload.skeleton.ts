## File: apps/meteor/client/views/room/body/hooks/useFileUpload.ts

```typescript
import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';

import type { Upload } from '../../../../lib/chats/Upload';
import { useChat } from '../../contexts/ChatContext';

const emptySubscribe = () => () => undefined;
const emptyUploads: readonly Upload[] = [];
const getEmptyUploads = () => emptyUploads;
const getEmptyBool = () => false;

export const useFileUpload = () => {
    /* Implementation Hidden */
};

```