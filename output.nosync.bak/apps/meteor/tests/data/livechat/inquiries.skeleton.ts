## File: apps/meteor/tests/data/livechat/inquiries.ts

```typescript
import type { Credentials } from '@rocket.chat/api-client';
import type { ILivechatInquiryRecord } from '@rocket.chat/core-typings';
import type { PaginatedResult } from '@rocket.chat/rest-typings';

import { api, request } from '../api-data';

export const fetchAllInquiries = async (credentials: Credentials, department?: string): Promise<ILivechatInquiryRecord[]> => {
    /* Implementation Hidden */
};

```