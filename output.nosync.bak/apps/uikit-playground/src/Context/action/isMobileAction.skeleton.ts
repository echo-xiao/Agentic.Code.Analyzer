## File: apps/uikit-playground/src/Context/action/isMobileAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type IsMobileAction = {
	type: ActionTypes.IsMobile;
	payload: boolean;
};

export const isMobileAction = (payload: boolean): IsMobileAction => ({
	type: ActionTypes.IsMobile,
	payload,
});

```