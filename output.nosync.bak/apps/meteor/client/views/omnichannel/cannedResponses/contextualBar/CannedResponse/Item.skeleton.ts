## File: apps/meteor/client/views/omnichannel/cannedResponses/contextualBar/CannedResponse/Item.tsx

```typescript
import type { ILivechatDepartment, IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, Button, Icon, Tag } from '@rocket.chat/fuselage';
import type { MouseEvent } from 'react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useScopeDict } from '../../../hooks/useScopeDict';

export type ItemProps = {
	data: IOmnichannelCannedResponse & { departmentName?: ILivechatDepartment['name'] };
	allowUse?: boolean;
	onClickItem: (e: MouseEvent<HTMLOrSVGElement>) => void;
	onClickUse: (e: MouseEvent<HTMLOrSVGElement>, text: string) => void;
};

const Item = ({ data, allowUse, onClickItem, onClickUse }: ItemProps) => {
    /* Implementation Hidden */
};

export default memo(Item);

```