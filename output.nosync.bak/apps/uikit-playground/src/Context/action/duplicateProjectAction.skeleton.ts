## File: apps/uikit-playground/src/Context/action/duplicateProjectAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type DuplicateProjectAction = {
	type: ActionTypes.DuplicateProject;
	payload: { id: string; name?: string };
};

export const duplicateProjectAction = (payload: { id: string; name?: string }): DuplicateProjectAction => ({
	type: ActionTypes.DuplicateProject,
	payload,
});

```