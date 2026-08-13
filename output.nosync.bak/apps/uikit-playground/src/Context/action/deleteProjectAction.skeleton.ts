## File: apps/uikit-playground/src/Context/action/deleteProjectAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type DeleteProjectAction = {
	type: ActionTypes.DeleteProject;
	payload: string;
};

export const deleteProjectAction = (payload: string): DeleteProjectAction => ({
	type: ActionTypes.DeleteProject,
	payload,
});

```