## File: apps/meteor/client/views/audit/hooks/useAuditForm.ts

```typescript
import type { ILivechatAgent, ILivechatVisitor, IRoom, IUser } from '@rocket.chat/core-typings';
import { useForm } from 'react-hook-form';

import { createEndOfToday, createStartOfToday } from '../utils/dateRange';

export type AuditFields = {
	msg: string;
	dateRange: {
		start?: Date;
		end?: Date;
	};
	rid: IRoom['_id'];
	users: Exclude<IUser['username'], undefined>[];
	visitor: ILivechatVisitor['_id'];
	agent: ILivechatAgent['_id'];
};

export const useAuditForm = () => {
    /* Implementation Hidden */
};

```