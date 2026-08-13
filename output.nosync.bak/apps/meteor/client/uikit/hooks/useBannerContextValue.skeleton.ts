## File: apps/meteor/client/uikit/hooks/useBannerContextValue.ts

```typescript
import type { UiKitContext } from '@rocket.chat/fuselage-ui-kit';
import type * as UiKit from '@rocket.chat/ui-kit';
import type { ContextType } from 'react';

import { useUiKitActionManager } from './useUiKitActionManager';

type UseBannerContextValueParams = {
	view: UiKit.BannerView;
	values: {
		[actionId: string]: {
			value: unknown;
			blockId?: string | undefined;
		};
	};
};
type UseBannerContextValueReturn = ContextType<typeof UiKitContext>;

export const useBannerContextValue = ({ view, values }: UseBannerContextValueParams): UseBannerContextValueReturn => {
    /* Implementation Hidden */
};

```