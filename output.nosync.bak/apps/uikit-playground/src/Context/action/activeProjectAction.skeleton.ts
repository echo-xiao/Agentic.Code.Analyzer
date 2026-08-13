## File: apps/uikit-playground/src/Context/action/activeProjectAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type ActiveProjectAction = {
	type: ActionTypes.ActiveProject;
	payload: string;
};

export const activeProjectAction = (payload: string): ActiveProjectAction => ({
	type: ActionTypes.ActiveProject,
	payload,
});

```