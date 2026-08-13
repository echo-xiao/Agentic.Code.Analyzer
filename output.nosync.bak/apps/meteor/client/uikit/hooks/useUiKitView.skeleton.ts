## File: apps/meteor/client/uikit/hooks/useUiKitView.ts

```typescript
import { useSafely } from '@rocket.chat/fuselage-hooks';
import { extractInitialStateFromLayout } from '@rocket.chat/fuselage-ui-kit';
import type * as UiKit from '@rocket.chat/ui-kit';
import type { Dispatch } from 'react';
import { useEffect, useMemo, useReducer, useState } from 'react';

import { useUiKitActionManager } from './useUiKitActionManager';

const reduceValues = (
	values: { [actionId: string]: { value: unknown; blockId?: string } },
	{ actionId, payload }: { actionId: string; payload: { value: unknown; blockId?: string } },
): { [actionId: string]: { value: unknown; blockId?: string } } => ({
	...values,
	[actionId]: payload,
});

const getViewId = (view: UiKit.View): string => {
    /* Implementation Hidden */
};

const getViewFromInteraction = (interaction: UiKit.ServerInteraction): UiKit.View | undefined => {
    /* Implementation Hidden */
};

type UseUiKitViewReturnType<TView extends UiKit.View> = {
	view: TView;
	errors?: { [field: string]: string }[];
	values: { [actionId: string]: { value: unknown; blockId?: string } };
	updateValues: Dispatch<{ actionId: string; payload: { value: unknown; blockId?: string } }>;
	state: {
		[blockId: string]: {
			[key: string]: unknown;
		};
	};
};

export function useUiKitView<S extends UiKit.View>(initialView: S): UseUiKitViewReturnType<S> {
    /* Implementation Hidden */
}

```