## File: apps/meteor/ee/app/livechat-enterprise/server/permissions.ts

```typescript
import { Permissions, Roles } from '@rocket.chat/models';

import { createOrUpdateProtectedRoleAsync } from '../../../../server/lib/roles/createOrUpdateProtectedRole';

const livechatMonitorRole = 'livechat-monitor';
const livechatManagerRole = 'livechat-manager';
const adminRole = 'admin';
const livechatAgentRole = 'livechat-agent';

export const omnichannelEEPermissions = [
	{ _id: 'manage-livechat-units', roles: [adminRole, livechatManagerRole] },
	{ _id: 'manage-livechat-monitors', roles: [adminRole, livechatManagerRole] },
	{ _id: 'manage-livechat-tags', roles: [adminRole, livechatManagerRole] },
	{ _id: 'manage-livechat-priorities', roles: [adminRole, livechatManagerRole] },
	{ _id: 'manage-livechat-sla', roles: [adminRole, livechatManagerRole] },
	{ _id: 'manage-livechat-canned-responses', roles: [adminRole, livechatManagerRole, livechatMonitorRole] },
	{ _id: 'request-pdf-transcript', roles: [adminRole, livechatManagerRole, livechatMonitorRole, livechatAgentRole] },
	{ _id: 'view-livechat-reports', roles: [adminRole, livechatManagerRole, livechatMonitorRole] },
	{ _id: 'block-livechat-contact', roles: [adminRole, livechatManagerRole, livechatMonitorRole, livechatAgentRole] },
	{ _id: 'unblock-livechat-contact', roles: [adminRole, livechatManagerRole, livechatMonitorRole, livechatAgentRole] },
	{ _id: 'outbound.send-messages', roles: [adminRole, livechatManagerRole, livechatMonitorRole, livechatAgentRole] },
	{ _id: 'outbound.can-assign-queues', roles: [adminRole, livechatManagerRole] },
	{ _id: 'outbound.can-assign-any-agent', roles: [adminRole, livechatManagerRole, livechatMonitorRole] },
	{ _id: 'outbound.can-assign-self-only', roles: [livechatAgentRole] },
];

export const createPermissions = async (): Promise<void> => {
    /* Implementation Hidden */
};

```