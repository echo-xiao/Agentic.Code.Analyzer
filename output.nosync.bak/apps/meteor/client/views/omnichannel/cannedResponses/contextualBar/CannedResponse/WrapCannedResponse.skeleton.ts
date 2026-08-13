## File: apps/meteor/client/views/omnichannel/cannedResponses/contextualBar/CannedResponse/WrapCannedResponse.tsx

```typescript
import type { ILivechatDepartment, IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import { useSetModal } from '@rocket.chat/ui-contexts';
import type { MouseEvent, MouseEventHandler } from 'react';
import { memo } from 'react';

import CannedResponse from './CannedResponse';
import { useCanEditCannedResponse } from '../../hooks/useCanEditCannedResponse';
import CreateCannedResponse from '../../modals/CreateCannedResponse';

export type WrapCannedResponseProps = {
	canUseCannedResponses: boolean;
	cannedItem: IOmnichannelCannedResponse & { departmentName?: ILivechatDepartment['name'] };
	onClickBack: MouseEventHandler<HTMLOrSVGElement>;
	onClickUse: (e: MouseEvent<HTMLOrSVGElement>, text: string) => void;
	onClose: () => void;
	reload: () => void;
};

const WrapCannedResponse = ({ canUseCannedResponses, cannedItem, onClickBack, onClose, onClickUse, reload }: WrapCannedResponseProps) => {
    /* Implementation Hidden */
};

export default memo(WrapCannedResponse);

```