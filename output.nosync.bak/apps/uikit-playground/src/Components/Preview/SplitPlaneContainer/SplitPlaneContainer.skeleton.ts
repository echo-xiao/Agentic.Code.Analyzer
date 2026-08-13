## File: apps/uikit-playground/src/Components/Preview/SplitPlaneContainer/SplitPlaneContainer.tsx

```typescript
import './splitPlane.css';
import { useEffect, useContext } from 'react';
import { Pane, SplitPane } from 'react-split-pane';

import { context, previewTabsToggleAction } from '../../../Context';
import Display from '../Display';
import EditorPanel from '../Editor';

type PreviewSizeType = {
	blockSize: number;
	inlineSize: number;
};

type SplitPlaneContainerProps = {
	previewSize: Partial<PreviewSizeType>;
};

const SplitPlaneContainer = ({ previewSize }: SplitPlaneContainerProps) => {
    /* Implementation Hidden */
};

export default SplitPlaneContainer;

```