## File: apps/meteor/ee/app/livechat-enterprise/server/business-hour/lib/business-hour.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';
import { LivechatBusinessHours, LivechatDepartment } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';

import { hasPermissionAsync } from '../../../../../../server/lib/authorization/hasPermission';
import type { IPaginatedResponse, IPagination } from '../../../../../server/api/v1/omnichannel/lib/definition';

interface IResponse extends IPaginatedResponse {
	businessHours: ILivechatBusinessHour[];
}

export async function findBusinessHours(userId: string, { offset, count, sort }: IPagination, name?: string): Promise<IResponse> {
    /* Implementation Hidden */
}

```