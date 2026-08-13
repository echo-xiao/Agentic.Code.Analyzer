## File: apps/meteor/client/hooks/useAppUiKitInteraction.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useStream, useUserId } from '@rocket.chat/ui-contexts';
import type * as UiKit from '@rocket.chat/ui-kit';
import { useEffect } from 'react';

export const useAppUiKitInteraction = (handleServerInteraction: (interaction: UiKit.ServerInteraction) => void) => {
    /* Implementation Hidden */
};

```