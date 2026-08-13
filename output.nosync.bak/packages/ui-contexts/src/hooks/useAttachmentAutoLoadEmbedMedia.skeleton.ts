## File: packages/ui-contexts/src/hooks/useAttachmentAutoLoadEmbedMedia.ts

```typescript
import { useContext } from 'react';

import { AttachmentContext } from '../AttachmentContext';

export const useAttachmentAutoLoadEmbedMedia = (): boolean => useContext(AttachmentContext).autoLoadEmbedMedias;

```