## File: apps/meteor/app/livechat-enterprise/client/index.ts

```typescript
import { hasLicense } from '../../license/client';

void hasLicense('livechat-enterprise').then((enabled) => {
	if (!enabled) {
		return;
	}

	return Promise.all([import('./views/livechatSideNavItems'), import('./views/business-hours/Multiple')]);
});

```