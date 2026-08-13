## File: apps/meteor/server/settings/threads.ts

```typescript
import { settingsRegistry } from '../../app/settings/server';

export const createThreadSettings = () =>
	settingsRegistry.addGroup('Threads', async function () {
		await this.add('Threads_enabled', true, {
			group: 'Threads',
			i18nLabel: 'Enable',
			type: 'boolean',
			public: true,
		});
	});

```