## File: apps/uikit-playground/src/Context/action/tabsToggleAction.ts

```typescript
import { ActionTypes } from '../reducer';

export type TabsToggleAction = {
	type: ActionTypes.EditorToggle;
	payload: number;
};

export const tabsToggleAction = (payload: number): TabsToggleAction => ({
	type: ActionTypes.EditorToggle,
	payload,
});

```