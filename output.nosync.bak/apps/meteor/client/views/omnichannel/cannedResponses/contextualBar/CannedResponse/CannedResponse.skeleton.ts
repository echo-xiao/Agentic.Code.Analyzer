## File: apps/meteor/client/views/omnichannel/cannedResponses/contextualBar/CannedResponse/CannedResponse.tsx

```typescript
import type { ILivechatDepartment, IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup, Tag } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarTitle,
	ContextualbarAction,
	ContextualbarContent,
	ContextualbarFooter,
	ContextualbarDialog,
	ContextualbarClose,
} from '@rocket.chat/ui-client';
import type { MouseEventHandler } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useScopeDict } from '../../../hooks/useScopeDict';

export type CannedResponseProps = {
	allowEdit: boolean;
	allowUse: boolean;
	data: {
		departmentName?: ILivechatDepartment['name'];
		shortcut: IOmnichannelCannedResponse['shortcut'];
		text: IOmnichannelCannedResponse['text'];
		scope: IOmnichannelCannedResponse['scope'];
		tags: IOmnichannelCannedResponse['tags'];
	};
	onClickBack: MouseEventHandler<HTMLOrSVGElement>;
	onClickEdit: MouseEventHandler<HTMLOrSVGElement>;
	onClickUse: MouseEventHandler<HTMLOrSVGElement>;
	onClose: () => void;
};

const CannedResponse = ({
	allowEdit,
	allowUse,
	data: { departmentName, shortcut, text, scope: dataScope, tags },
	onClickBack,
	onClickEdit,
	onClickUse,
	onClose,
}: CannedResponseProps) => {
    /* Implementation Hidden */
};

export default memo(CannedResponse);

```