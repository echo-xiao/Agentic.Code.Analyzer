## File: apps/meteor/client/views/omnichannel/cannedResponses/contextualBar/CannedResponse/CannedResponseList.tsx

```typescript
import type { ILivechatDepartment, IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup, ContextualbarEmptyContent, Icon, Margins, Select, TextInput } from '@rocket.chat/fuselage';
import { useAutoFocus, useResizeObserver } from '@rocket.chat/fuselage-hooks';
import {
	VirtualizedScrollbars,
	ContextualbarHeader,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarFooter,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useRoomToolbox } from '@rocket.chat/ui-contexts';
import type { Dispatch, ChangeEventHandler, MouseEvent, SetStateAction } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import Item from './Item';
import WrapCannedResponse from './WrapCannedResponse';
import { useCanCreateCannedResponse } from '../../hooks/useCanCreateCannedResponse';

export type CannedResponseListProps = {
	loadMoreItems: () => void;
	cannedItems: (IOmnichannelCannedResponse & { departmentName?: ILivechatDepartment['name'] })[];
	itemCount: number;
	onClose: () => void;
	options: [string, string][];
	text: string;
	setText: ChangeEventHandler<HTMLInputElement>;
	type: string;
	setType: Dispatch<SetStateAction<string>>;
	isRoomOverMacLimit: boolean;
	onClickItem: (data: any) => void; // FIXME: fix typings
	onClickCreate: (e: MouseEvent<HTMLOrSVGElement>) => void;
	onClickUse: (e: MouseEvent<HTMLOrSVGElement>, text: string) => void;
	reload: () => void;
};

const CannedResponseList = ({
	loadMoreItems,
	cannedItems,
	itemCount,
	onClose,
	options,
	text,
	setText,
	type,
	setType,
	isRoomOverMacLimit,
	onClickItem,
	onClickCreate,
	onClickUse,
	reload,
}: CannedResponseListProps) => {
    /* Implementation Hidden */
};

export default memo(CannedResponseList);

```