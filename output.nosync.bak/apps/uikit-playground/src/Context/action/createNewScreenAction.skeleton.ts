## File: apps/uikit-playground/src/Context/action/createNewScreenAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type CreateNewScreenAction = {
	type: ActionTypes.CreateNewScreen;
	payload?: string;
};

export const createNewScreenAction = (payload?: string): CreateNewScreenAction => ({
	type: ActionTypes.CreateNewScreen,
	payload,
});

```