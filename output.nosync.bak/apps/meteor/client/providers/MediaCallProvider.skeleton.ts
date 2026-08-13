## File: apps/meteor/client/providers/MediaCallProvider.tsx

```typescript
import { Emitter } from '@rocket.chat/emitter';
import { usePermission } from '@rocket.chat/ui-contexts';
import { MediaCallProvider as MediaCallProviderBase, MediaCallInstanceContext } from '@rocket.chat/ui-voip';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { useHasLicenseModule } from '../hooks/useHasLicenseModule';

export type MediaCallProviderProps = { children: ReactNode };

const MediaCallProvider = ({ children }: MediaCallProviderProps) => {
    /* Implementation Hidden */
};

export default MediaCallProvider;

```