## File: packages/ui-contexts/src/hooks/useUpload.ts

```typescript
import type { PathFor } from '@rocket.chat/rest-typings';
import { useCallback, useContext } from 'react';

import type { UploadResult } from '../ServerContext';
import { ServerContext } from '../ServerContext';

export const useUpload = (endpoint: PathFor<'POST'>): ((formData: any) => Promise<UploadResult> | { promise: Promise<UploadResult> }) => {
    /* Implementation Hidden */
};

```