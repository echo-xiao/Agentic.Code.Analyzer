## File: apps/meteor/lib/roles/getMostImportantRole.ts

```typescript
import type { IRole } from '@rocket.chat/core-typings';

type PriorityRoleName =
	| 'custom-role'
	| 'admin'
	| 'livechat-manager'
	| 'livechat-monitor'
	| 'livechat-agent'
	| 'user'
	| 'app'
	| 'bot'
	| 'guest'
	| 'anonymous';

const order = [
	'admin',
	'livechat-manager',
	'livechat-monitor',
	'livechat-agent',
	'custom-role',
	'user',
	'app',
	'bot',
	'guest',
	'anonymous',
] as const;

const rolesToConsiderAsUser = ['auditor', 'auditor-log'];

export function getMostImportantRole(roles: IRole['_id'][] = []): 'no-role' | PriorityRoleName {
    /* Implementation Hidden */
}

```