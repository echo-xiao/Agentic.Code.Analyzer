## File: apps/meteor/app/livechat/server/lib/departmentsLib.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import type { LivechatDepartmentDTO, ILivechatDepartment, ILivechatDepartmentAgents, ILivechatAgent } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatDepartmentAgents, LivechatVisitors, LivechatRooms, Users } from '@rocket.chat/models';
import { isDepartmentCreationAvailable } from '@rocket.chat/omni-core';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { updateDepartmentAgents } from './Helper';
import { afterDepartmentArchived, afterDepartmentUnarchived } from './hooks';
import { livechatLogger } from './logger';
import { callbacks } from '../../../../server/lib/callbacks';
import {
	notifyOnLivechatDepartmentAgentChangedByDepartmentId,
	notifyOnLivechatDepartmentAgentChanged,
} from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';
/**
 * @param {string|null} _id - The department id
 * @param {Partial<import('@rocket.chat/core-typings').ILivechatDepartment>} departmentData
 * @param {{upsert?: { agentId: string; count?: number; order?: number; }[], remove?: { agentId: string; count?: number; order?: number; }}} [departmentAgents] - The department agents
 * @param {{_id?: string}} [departmentUnit] - The department's unit id
 */
export async function saveDepartment(
	userId: string,
	_id: string | null,
	departmentData: LivechatDepartmentDTO,
	departmentAgents?: {
		upsert?: { agentId: string; count?: number; order?: number }[];
		remove?: { agentId: string; count?: number; order?: number }[];
	},
	departmentUnit?: { _id?: string },
) {
    /* Implementation Hidden */
}

export async function archiveDepartment(_id: string) {
    /* Implementation Hidden */
}

export async function unarchiveDepartment(_id: string) {
    /* Implementation Hidden */
}

export async function saveDepartmentAgents(
	_id: string,
	departmentAgents: {
		upsert?: (Pick<ILivechatDepartmentAgents, 'agentId' | 'username'> & {
			count?: number;
			order?: number;
		})[];
		remove?: Pick<ILivechatDepartmentAgents, 'agentId' | 'username'>[];
	},
) {
    /* Implementation Hidden */
}

export async function setDepartmentForGuest({ visitorId, department }: { visitorId: string; department: string }) {
    /* Implementation Hidden */
}

export async function removeDepartment(departmentId: string) {
    /* Implementation Hidden */
}

export async function getRequiredDepartment(onlineRequired = true) {
    /* Implementation Hidden */
}

export async function checkOnlineForDepartment(departmentId: string) {
    /* Implementation Hidden */
}

export async function getOnlineForDepartment(departmentId: string) {
    /* Implementation Hidden */
}

```