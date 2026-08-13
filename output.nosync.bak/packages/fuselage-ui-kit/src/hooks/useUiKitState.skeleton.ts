## File: packages/fuselage-ui-kit/src/hooks/useUiKitState.ts

```typescript
import { useStableCallback, useSafely } from '@rocket.chat/fuselage-hooks';
import * as UiKit from '@rocket.chat/ui-kit';
import { useContext, useMemo, useState } from 'react';

import { UiKitContext } from '../contexts/UiKitContext';
import { getInitialValue } from '../utils/getInitialValue';

const getElementValueFromState = (
	actionId: string,
	values: Record<
		string,
		| {
				value: unknown;
		  }
		| undefined
	>,
	initialValue: string | number | string[] | undefined,
) => (values && (values[actionId]?.value as string | number | string[] | undefined)) ?? initialValue;

type UiKitState<TElement extends UiKit.ActionableElement = UiKit.ActionableElement> = {
	loading: boolean;
	setLoading: (loading: boolean) => void;
	error?: string;
	value: UiKit.ActionOf<TElement>;
};

export const useUiKitState = <TElement extends UiKit.ActionableElement>(
	element: TElement,
	context: UiKit.BlockContext,
): [
	state: UiKitState<TElement>,
	action: (pseudoEvent?: Event | { target: EventTarget } | { target: { value: UiKit.ActionOf<TElement> } }) => Promise<void>,
] => {
    /* Implementation Hidden */
};

```