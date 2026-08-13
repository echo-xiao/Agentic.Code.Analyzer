## File: apps/meteor/client/uikit/hooks/useModalContextValue.ts

```typescript
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import type { UiKitContext } from '@rocket.chat/fuselage-ui-kit';
import type * as UiKit from '@rocket.chat/ui-kit';
import { useMemo } from 'react';
import type { Dispatch, ContextType } from 'react';

import { useUiKitActionManager } from './useUiKitActionManager';

type UseModalContextValueParams = {
	view: UiKit.ModalView;
	values: {
		[actionId: string]: {
			value: unknown;
			blockId?: string | undefined;
		};
	};
	errors?: { [field: string]: string }[] | { [field: string]: string };
	updateValues: Dispatch<{
		actionId: string;
		payload: {
			value: unknown;
			blockId?: string;
		};
	}>;
};

type UseModalContextValueReturn = ContextType<typeof UiKitContext>;

export const useModalContextValue = ({ view, errors, values, updateValues }: UseModalContextValueParams): UseModalContextValueReturn => {
    /* Implementation Hidden */
};

```