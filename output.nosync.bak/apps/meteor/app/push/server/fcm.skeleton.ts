## File: apps/meteor/app/push/server/fcm.ts

```typescript
import { serverFetch as fetch, type ExtendedFetchOptions } from '@rocket.chat/server-fetch';
import EJSON from 'ejson';
import type { Response } from 'node-fetch';

import type { PendingPushNotification } from './definition';
import { logger } from './logger';
import type { NativeNotificationParameters } from './push';

type FCMDataField = Record<string, any>;

type FCMNotificationField = {
	title?: string;
	body?: string;
	image?: string;
};

type FCMMessage = {
	notification?: FCMNotificationField;
	data?: FCMDataField;
	token?: string;
	to?: string;
	android?: {
		collapseKey?: string;
		priority?: 'HIGH' | 'NORMAL';
		ttl?: string;
		restrictedPackageName?: string;
		data?: FCMDataField;
		notification?: FCMNotificationField;
		fcm_options?: {
			analytics_label?: string;
		};
		direct_boot_ok?: boolean;
	};
	webpush?: {
		headers?: FCMDataField;
		data?: FCMDataField;
		notification?: FCMNotificationField;
		fcm_options?: {
			link?: string;
			analytics_label?: string;
		};
	};
	fcm_options?: {
		analytics_label?: string;
	};
};

// https://firebase.google.com/docs/reference/fcm/rest/v1/ErrorCode
type FCMError = {
	error: {
		code: number;
		message: string;
		status: string;
	};
};

// The 403 error code is used when the server is refusing to process a request to a specific token due to
// a SENDER_ID_MISMATCH error. This error is returned when the sender ID provided in the request does not match the sender ID
// associated with the registration token.
const SENDER_ID_MISMATCH_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;

/**
 * Send a push notification using Firebase Cloud Messaging (FCM).
 * implements the Firebase Cloud Messaging HTTP v1 API, and all of its retry logic,
 * see: https://firebase.google.com/docs/reference/fcm/rest/v1/ErrorCode
 *
 * Errors:
 * - For 400, 401 errors: abort, and do not retry.
 * - For 404 errors: remove the token from the database.
 * - For 429 errors: retry after waiting for the duration set in the retry-after header. If no retry-after header is set, default to 60 seconds.
 * - For 5xx errors: retry with exponential backoff.
 */
async function fetchWithRetry(url: string, _removeToken: () => void, options: ExtendedFetchOptions, retries = 0): Promise<Response> {
    /* Implementation Hidden */
}

function getFCMMessagesFromPushData(userTokens: string[], notification: PendingPushNotification): { message: FCMMessage }[] {
    /* Implementation Hidden */
}

export const sendFCM = function ({ userTokens, notification, _removeToken, options }: NativeNotificationParameters): void {
    /* Implementation Hidden */
};

```