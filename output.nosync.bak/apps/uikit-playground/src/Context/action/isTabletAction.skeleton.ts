## File: apps/uikit-playground/src/Context/action/isTabletAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type IsTabletAction = {
	type: ActionTypes.IsTablet;
	payload: boolean;
};

export const isTabletAction = (payload: boolean): IsTabletAction => ({
	type: ActionTypes.IsTablet,
	payload,
});

```