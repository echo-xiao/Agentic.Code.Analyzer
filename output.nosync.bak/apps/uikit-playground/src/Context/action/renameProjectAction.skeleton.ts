## File: apps/uikit-playground/src/Context/action/renameProjectAction.ts

```typescript
import { ActionTypes } from '../reducer';

type payloadType = {
	id: string;
	name: string;
};

export type RenameProjectAction = {
	type: ActionTypes.RenameProject;
	payload: payloadType;
};

export const renameProjectAction = (payload: payloadType): RenameProjectAction => ({
	type: ActionTypes.RenameProject,
	payload,
});

```