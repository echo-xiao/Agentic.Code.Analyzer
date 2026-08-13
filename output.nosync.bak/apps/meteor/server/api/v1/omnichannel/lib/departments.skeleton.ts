## File: apps/meteor/server/api/v1/omnichannel/lib/departments.ts

```typescript
import type { ILivechatDepartment, ILivechatDepartmentAgents } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatDepartmentAgents } from '@rocket.chat/models';
import { applyDepartmentRestrictions } from '@rocket.chat/omni-core';
import type { PaginatedResult } from '@rocket.chat/rest-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Document, Filter, FilterOperators, FindOptions } from 'mongodb';

import { hasPermissionAsync } from '../../../../lib/authorization/hasPermission';

type Pagination<T extends Document> = { pagination: { offset: number; count: number; sort: FindOptions<T>['sort'] } };
type FindDepartmentParams = {
	userId: string;
	onlyMyDepartments?: boolean;
	text?: string;
	enabled?: boolean;
	excludeDepartmentId?: string;
	showArchived?: boolean;
} & Pagination<ILivechatDepartment>;
type FindDepartmentByIdParams = {
	userId: string;
	departmentId: string;
	includeAgents?: boolean;
	onlyMyDepartments?: boolean;
};
type FindDepartmentToAutocompleteParams = {
	uid: string;
	selector: {
		exceptions: string[];
		conditions: Filter<ILivechatDepartment>;
		term: string;
	};
	onlyMyDepartments?: boolean;
	showArchived?: boolean;
};
type FindDepartmentAgentsParams = {
	userId: string;
	departmentId: string;
} & Pagination<ILivechatDepartmentAgents>;

export async function findDepartments({
	userId,
	onlyMyDepartments = false,
	text,
	enabled,
	excludeDepartmentId,
	showArchived = false,
	pagination: { offset, count, sort },
}: FindDepartmentParams): Promise<PaginatedResult<{ departments: ILivechatDepartment[] }>> {
    /* Implementation Hidden */
}

export async function findArchivedDepartments({
	userId,
	onlyMyDepartments = false,
	text,
	excludeDepartmentId,
	pagination: { offset, count, sort },
}: FindDepartmentParams): Promise<PaginatedResult<{ departments: ILivechatDepartment[] }>> {
    /* Implementation Hidden */
}

export async function findDepartmentById({
	userId,
	departmentId,
	includeAgents = true,
	onlyMyDepartments = false,
}: FindDepartmentByIdParams): Promise<{
	department: ILivechatDepartment | null;
	agents?: ILivechatDepartmentAgents[];
}> {
    /* Implementation Hidden */
}

export async function findDepartmentsToAutocomplete({
	uid,
	selector,
	onlyMyDepartments = false,
	showArchived = false,
}: FindDepartmentToAutocompleteParams): Promise<{ items: ILivechatDepartment[] }> {
    /* Implementation Hidden */
}

export async function findDepartmentAgents({
	departmentId,
	pagination: { offset, count, sort },
}: FindDepartmentAgentsParams): Promise<PaginatedResult<{ agents: ILivechatDepartmentAgents[] }>> {
    /* Implementation Hidden */
}

export async function findDepartmentsBetweenIds({
	ids,
	fields,
}: {
	ids: string[];
	fields: Record<string, unknown>;
}): Promise<{ departments: ILivechatDepartment[] }> {
    /* Implementation Hidden */
}

```