## File: apps/meteor/client/hooks/useExpirationText.ts

```typescript
import { useLanguage } from '@rocket.chat/ui-contexts';
import { isSameDay } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatDate } from './useFormatDate';
import { useFormatTime } from './useFormatTime';

// Handles Date, ISO string, and EJSON { $date } (from DDP streamer which does raw JSON.parse without EJSON deserialization)
function parseExpiresAt(value?: unknown): Date | undefined {
    /* Implementation Hidden */
}

export function useExpirationText(statusExpiresAt?: Date | string) {
    /* Implementation Hidden */
}

```