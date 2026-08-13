## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/beforeNewRoom.ts

```typescript
import type { IOmnichannelRoomInfo, IOmnichannelRoomExtraData, IOmnichannelRoom } from '@rocket.chat/core-typings';
import { OmnichannelServiceLevelAgreements } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { beforeNewRoom } from '../../../../../app/livechat/server/lib/hooks';
import { isPlainObject } from '../../../../../lib/utils/isPlainObject';

export const beforeNewRoomPatched = async (
	_next: any,
	roomInfo: IOmnichannelRoomInfo,
	extraData?: IOmnichannelRoomExtraData,
): Promise<Partial<IOmnichannelRoom>> => {
    /* Implementation Hidden */
};

beforeNewRoom.patch(beforeNewRoomPatched);

```