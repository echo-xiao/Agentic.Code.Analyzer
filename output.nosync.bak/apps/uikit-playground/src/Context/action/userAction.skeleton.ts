## File: apps/uikit-playground/src/Context/action/userAction.ts

```typescript
import type { userType } from '../initialState';
import { ActionTypes } from '../reducer';

export type UserAction = {
	type: ActionTypes.User;
	payload: userType;
};

export const userAction = (payload: userType): UserAction => ({
	type: ActionTypes.User,
	payload,
});

```