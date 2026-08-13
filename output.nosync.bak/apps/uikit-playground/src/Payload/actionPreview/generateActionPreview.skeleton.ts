## File: apps/uikit-playground/src/Payload/actionPreview/generateActionPreview.ts

```typescript
import container from './container';
import { SurfaceOptions } from '../../Components/Preview/Display/Surface/constant';
import type { ILayoutBlock, actionPreviewType, initialStateType } from '../../Context/initialState';

const generateActionPreview = ({
	type,
	data,
	surface,
	blocks,
	user,
}: {
	type: string;
	data: actionPreviewType;
	surface: SurfaceOptions;
	blocks: ILayoutBlock[];
	user: initialStateType['user'];
}) => {
    /* Implementation Hidden */
};

export default generateActionPreview;

```