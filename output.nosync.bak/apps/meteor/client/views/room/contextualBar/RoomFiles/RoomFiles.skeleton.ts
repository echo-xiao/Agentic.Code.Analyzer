## File: apps/meteor/client/views/room/contextualBar/RoomFiles/RoomFiles.tsx

```typescript
import type { IRoom, IUpload, IUploadWithUser } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Icon, TextInput, Select, Throbber, ContextualbarSection } from '@rocket.chat/fuselage';
import {
	VirtualizedScrollbars,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarEmptyContent,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import type { ChangeEvent } from 'react';
import { useId, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import RoomFileItemWrapper from './RoomFileItemWrapper';
import RoomFilesListWrapper from './RoomFilesListWrapper';
import FileItem from './components/FileItem';
import ResultsLiveRegion from '../../../../components/ResultsLiveRegion';

type RoomFilesProps = {
	rid: IRoom['_id'];
	isPending: boolean;
	isSuccess: boolean;
	type: string;
	text: string;
	filesItems: IUploadWithUser[];
	loadMoreItems: () => void;
	setType: (value: any) => void;
	setText: (e: ChangeEvent<HTMLInputElement>) => void;
	total: number;
	onClickClose: () => void;
	onClickDelete: (id: IUpload['_id']) => void;
};

const RoomFiles = ({
	rid,
	isPending,
	isSuccess,
	type,
	text,
	filesItems = [],
	loadMoreItems,
	setType,
	setText,
	total,
	onClickClose,
	onClickDelete,
}: RoomFilesProps) => {
    /* Implementation Hidden */
};

export default RoomFiles;

```