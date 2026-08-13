## File: apps/meteor/client/views/room/webdav/WebdavFilePickerModal/WebdavFilePickerGrid/WebdavFilePickerGrid.tsx

```typescript
import type { IWebdavNode } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, Icon, Skeleton, Palette } from '@rocket.chat/fuselage';

import WebdavFilePickerGridItem from './WebdavFilePickerGridItem';
import GenericNoResults from '../../../../../components/GenericNoResults';
import { getNodeIconType } from '../lib/getNodeIconType';

type WebdavFilePickerGridProps = {
	webdavNodes: IWebdavNode[];
	onNodeClick: (file: IWebdavNode) => void;
	isLoading: boolean;
};

const WebdavFilePickerGrid = ({ webdavNodes, onNodeClick, isLoading }: WebdavFilePickerGridProps) => {
    /* Implementation Hidden */
};

export default WebdavFilePickerGrid;

```