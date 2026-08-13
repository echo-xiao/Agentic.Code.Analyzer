## File: packages/ui-contexts/src/hooks/useAssetPath.ts

```typescript
import type { IRocketChatAssets, ISettingAsset } from '@rocket.chat/core-typings';

import { useAbsoluteUrl } from './useAbsoluteUrl';
import { useSetting } from './useSetting';

export const useAssetPath = (assetId: keyof IRocketChatAssets): string | undefined => {
    /* Implementation Hidden */
};

```