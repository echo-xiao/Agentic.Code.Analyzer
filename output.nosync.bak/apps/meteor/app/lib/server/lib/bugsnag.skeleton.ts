## File: apps/meteor/app/lib/server/lib/bugsnag.ts

```typescript
import Bugsnag from '@bugsnag/js';
import { Logger } from '@rocket.chat/logger';
import { Meteor } from 'meteor/meteor';

import { settings } from '../../../settings/server';
import { Info } from '../../../utils/rocketchat.info';

const logger = new Logger('bugsnag');

const originalMeteorDebug = Meteor._debug;

function _bugsnagDebug(message: any, stack: any, ...args: any): void {
    /* Implementation Hidden */
}

settings.watch('Bugsnag_api_key', (value) => {
	if (!value) {
		return;
	}

	Bugsnag.start({
		apiKey: value as string,
		appVersion: Info.version,
		logger,
		metadata: Info,
	});

	Meteor._debug = _bugsnagDebug;
});

```