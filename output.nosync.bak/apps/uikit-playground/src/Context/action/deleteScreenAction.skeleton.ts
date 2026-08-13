## File: apps/uikit-playground/src/Context/action/deleteScreenAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type DeleteScreenAction = {
	type: ActionTypes.DeleteScreen;
	payload: string;
};

export const deleteScreenAction = (payload: string): DeleteScreenAction => ({
	type: ActionTypes.DeleteScreen,
	payload,
});

```