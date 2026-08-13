## File: apps/meteor/client/views/room/webdav/WebdavFilePickerModal/WebdavFilePickerTable.tsx

```typescript
import type { IWebdavNode } from '@rocket.chat/core-typings';
import { Box, Icon } from '@rocket.chat/fuselage';
import {
	GenericTable,
	GenericTableBody,
	GenericTableCell,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingRow,
	GenericTableRow,
} from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import type { WebdavSortOptions } from './WebdavFilePickerModal';
import { getNodeFileSize } from './lib/getNodeFileSize';
import { getNodeIconType } from './lib/getNodeIconType';
import GenericNoResults from '../../../../components/GenericNoResults';
import { timeAgo } from '../../../../lib/utils/timeAgo';

type WebdavFilePickerTableProps = {
	webdavNodes: IWebdavNode[];
	sortBy: string;
	sortDirection: 'asc' | 'desc';
	onSort: (sortBy: WebdavSortOptions, sortDirection?: 'asc' | 'desc') => void;
	onNodeClick: (webdavNode: IWebdavNode) => void;
	isLoading: boolean;
};

const WebdavFilePickerTable = ({ webdavNodes, sortBy, sortDirection, onSort, onNodeClick, isLoading }: WebdavFilePickerTableProps) => {
    /* Implementation Hidden */
};

export default WebdavFilePickerTable;

```