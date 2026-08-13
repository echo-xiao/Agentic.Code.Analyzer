## File: apps/meteor/ee/app/livechat-enterprise/server/lib/Department.ts

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import { LivechatDepartment } from '@rocket.chat/models';
import { applyDepartmentRestrictions } from '@rocket.chat/omni-core';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Filter } from 'mongodb';

export const findAllDepartmentsAvailable = async (
	uid: string,
	unitId: string,
	offset: number,
	count: number,
	text?: string,
	onlyMyDepartments = false,
): Promise<{ departments: ILivechatDepartment[]; total: number }> => {
    /* Implementation Hidden */
};

export const findAllDepartmentsByUnit = async (
	unitId: string,
	offset: number,
	count: number,
): Promise<{ departments: ILivechatDepartment[]; total: number }> => {
    /* Implementation Hidden */
};

```