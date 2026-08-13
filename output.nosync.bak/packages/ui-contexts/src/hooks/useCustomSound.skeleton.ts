## File: packages/ui-contexts/src/hooks/useCustomSound.ts

```typescript
import { useContext } from 'react';

import type { CustomSoundContextValue } from '../CustomSoundContext';
import { CustomSoundContext } from '../CustomSoundContext';

export const useCustomSound = (): CustomSoundContextValue => useContext(CustomSoundContext);

```