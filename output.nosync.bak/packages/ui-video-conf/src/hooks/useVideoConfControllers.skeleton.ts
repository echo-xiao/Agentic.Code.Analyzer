## File: packages/ui-video-conf/src/hooks/useVideoConfControllers.ts

```typescript
import { useCallback, useState } from 'react';

type controllersConfigProps = {
	mic?: boolean;
	cam?: boolean;
};

export const useVideoConfControllers = (
	initialPreferences: controllersConfigProps = { mic: true, cam: false },
): { controllersConfig: controllersConfigProps; handleToggleMic: () => void; handleToggleCam: () => void } => {
    /* Implementation Hidden */
};

```