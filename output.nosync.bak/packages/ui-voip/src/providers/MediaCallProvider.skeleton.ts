## File: packages/ui-voip/src/providers/MediaCallProvider.tsx

```typescript
import { AnchorPortal } from '@rocket.chat/ui-client';
import type { ReactNode } from 'react';

import MediaCallInstanceProvider from './MediaCallInstanceProvider';
import MediaCallViewProvider from './MediaCallViewProvider';
import { MediaCallWidget } from '../views';
import MediaCallPopout from '../views/MediaCallPopout';

type MediaCallProviderProps = {
	children: ReactNode;
};

const MediaCallProvider = ({ children }: MediaCallProviderProps) => {
    /* Implementation Hidden */
};

export default MediaCallProvider;

```