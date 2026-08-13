## File: apps/uikit-playground/src/Components/Preview/Editor/EditorPanel.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import { Fragment, useContext } from 'react';

import ActionBlockEditor from './ActionBlockEditor';
import ActionPreviewEditor from './ActionPreviewEditor';
import { context, editorTabsToggleAction } from '../../../Context';
import FlowDiagram from '../../../Pages/FlowDiagram';
import PrototypeContainer from '../../PtototypeContainer/PrototypeContainer';
import ToggleTabs from '../../ToggleTabs';

enum TabsItem {
	ActionBlock,
	ActionPreview,
	FlowDiagram,
	Prototype,
}

const tabsItem = {
	[TabsItem.ActionBlock]: {
		name: 'Action Block',
		Container: ActionBlockEditor,
	},
	[TabsItem.ActionPreview]: {
		name: 'Action Preview',
		Container: ActionPreviewEditor,
	},
	[TabsItem.FlowDiagram]: {
		name: 'Flow Diagram',
		Container: FlowDiagram,
	},
	[TabsItem.Prototype]: { name: 'Prototype', Container: PrototypeContainer },
} as const;

const EditorPanel = () => {
    /* Implementation Hidden */
};
export default EditorPanel;

```