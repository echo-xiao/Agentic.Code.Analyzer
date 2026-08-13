## File: apps/meteor/client/uikit/hooks/useContextualBarContextValue.ts

```typescript
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import type { UiKitContext } from '@rocket.chat/fuselage-ui-kit';
import type * as UiKit from '@rocket.chat/ui-kit';
import { useMemo } from 'react';
import type { Dispatch, ContextType } from 'react';

import { useUiKitActionManager } from './useUiKitActionManager';

type UseContextualBarContextValueParams = {
	view: UiKit.ContextualBarView;
	values: {
		[actionId: string]: {
			value: unknown;
			blockId?: string | undefined;
		};
	};
	updateValues: Dispatch<{
		actionId: string;
		payload: {
			value: unknown;
			blockId?: string | undefined;
		};
	}>;
	rid: string;
};
type UseContextualBarContextValueReturn = ContextType<typeof UiKitContext>;

export const useContextualBarContextValue = ({
	view,
	values,
	updateValues,
	rid,
}: UseContextualBarContextValueParams): UseContextualBarContextValueReturn => {
    /* Implementation Hidden */
};

```