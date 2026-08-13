## File: apps/meteor/app/push/server/apn.ts

```typescript
import apn from '@parse/node-apn';
import type { RequiredField } from '@rocket.chat/core-typings';
import EJSON from 'ejson';

import type { PushOptions, PendingPushNotification } from './definition';
import { logger } from './logger';

let apnConnection: apn.Provider | undefined;

declare module '@parse/node-apn' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface Notification {
		setContentAvailable: (value: boolean | 1 | 0) => void;
		set category(_value: string | undefined);
		set body(_value: string);
		set title(_value: string);
	}
}

export const sendAPN = ({
	userToken,
	notification,
	_removeToken,
}: {
	userToken: string;
	notification: PendingPushNotification & { topic: string };
	_removeToken: (token: string) => void;
}) => {
    /* Implementation Hidden */
};

export const initAPN = ({ options, absoluteUrl }: { options: RequiredField<PushOptions, 'apn'>; absoluteUrl: string }) => {
    /* Implementation Hidden */
};

```