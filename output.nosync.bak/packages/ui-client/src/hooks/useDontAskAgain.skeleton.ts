## File: packages/ui-client/src/hooks/useDontAskAgain.ts

```typescript
import { useUserPreference } from '@rocket.chat/ui-contexts';

export type DontAskAgainList = Array<{ action: string; label: string }>;

export const useDontAskAgain = (action: string): boolean => {
    /* Implementation Hidden */
};

```