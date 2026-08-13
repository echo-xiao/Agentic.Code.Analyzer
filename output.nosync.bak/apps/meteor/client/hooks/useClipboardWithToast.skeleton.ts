## File: apps/meteor/client/hooks/useClipboardWithToast.ts

```typescript
import type { UseClipboardReturn } from '@rocket.chat/fuselage-hooks';
import { useClipboard, useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

export default function useClipboardWithToast(text: string): UseClipboardReturn {
    /* Implementation Hidden */
}

```