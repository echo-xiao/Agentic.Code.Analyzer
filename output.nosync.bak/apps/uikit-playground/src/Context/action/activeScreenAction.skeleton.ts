## File: apps/uikit-playground/src/Context/action/activeScreenAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type ActiveScreenAction = {
	type: ActionTypes.ActiveScreen;
	payload: string;
};

export const activeScreenAction = (payload: string): ActiveScreenAction => ({
	type: ActionTypes.ActiveScreen,
	payload,
});

```