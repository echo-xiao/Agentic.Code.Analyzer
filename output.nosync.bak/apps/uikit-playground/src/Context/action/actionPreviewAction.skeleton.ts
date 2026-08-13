## File: apps/uikit-playground/src/Context/action/actionPreviewAction.ts

```typescript
import type { actionPreviewType } from '../initialState';
import { ActionTypes } from '../reducer';

export type ActionPreviewAction = {
	type: ActionTypes.ActionPreview;
	payload: actionPreviewType;
};

export const actionPreviewAction = (payload: actionPreviewType): ActionPreviewAction => ({
	type: ActionTypes.ActionPreview,
	payload,
});

```