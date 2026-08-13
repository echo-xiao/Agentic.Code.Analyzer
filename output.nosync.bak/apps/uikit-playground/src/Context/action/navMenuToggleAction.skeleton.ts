## File: apps/uikit-playground/src/Context/action/navMenuToggleAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type NavMenuToggleAction = {
	type: ActionTypes.NavMenuToggle;
	payload: boolean;
};

export const navMenuToggleAction = (payload: boolean): NavMenuToggleAction => ({
	type: ActionTypes.NavMenuToggle,
	payload,
});

```