## File: apps/meteor/app/push/server/push.ts

```typescript
import type { IPushToken, RequiredField, Optional, IPushNotificationConfig } from '@rocket.chat/core-typings';
import { PushToken } from '@rocket.chat/models';
import { ajv } from '@rocket.chat/rest-typings';
import type { ExtendedFetchOptions } from '@rocket.chat/server-fetch';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { pick, truncateString } from '@rocket.chat/tools';
import { JWT } from 'google-auth-library';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { initAPN, sendAPN } from './apn';
import type { PushOptions, PendingPushNotification } from './definition';
import { sendFCM } from './fcm';
import { logger } from './logger';
import { settings } from '../../settings/server';

export const _matchToken = Match.OneOf({ apn: String }, { gcm: String });

const PUSH_TITLE_LIMIT = 65;
const PUSH_MESSAGE_BODY_LIMIT = 240;
const PUSH_GATEWAY_MAX_RETRIES = 5;

type FCMCredentials = {
	type: string;
	project_id: string;
	private_key_id: string;
	private_key: string;
	client_email: string;
	client_id: string;
	auth_uri: string;
	token_uri: string;
	auth_provider_x509_cert_url: string;
	client_x509_cert_url: string;
	universe_domain: string;
};

export const FCMCredentialsValidationSchema = {
	type: 'object',
	properties: {
		type: {
			type: 'string',
		},
		project_id: {
			type: 'string',
		},
		private_key_id: {
			type: 'string',
		},
		private_key: {
			type: 'string',
		},
		client_email: {
			type: 'string',
		},
		client_id: {
			type: 'string',
		},
		auth_uri: {
			type: 'string',
		},
		token_uri: {
			type: 'string',
		},
		auth_provider_x509_cert_url: {
			type: 'string',
		},
		client_x509_cert_url: {
			type: 'string',
		},
		universe_domain: {
			type: 'string',
		},
	},
	required: ['client_email', 'project_id', 'private_key_id', 'private_key'],
};

export const isFCMCredentials = ajv.compile<FCMCredentials>(FCMCredentialsValidationSchema);

// This type must match the type defined in the push gateway
type GatewayNotification = {
	uniqueId: string;
	from?: string;
	title?: string;
	text?: string;
	badge?: number;
	sound?: string;
	notId?: number;
	contentAvailable?: 1 | 0;
	forceStart?: number;
	topic?: string;
	apn?: {
		from?: string;
		title?: string;
		text?: string;
		badge?: number;
		sound?: string;
		notId?: number;
		category?: string;
		expirationSeconds?: number;
	};
	gcm?: {
		from?: string;
		title?: string;
		text?: string;
		image?: string;
		style?: string;
		summaryText?: string;
		picture?: string;
		badge?: number;
		sound?: string;
		notId?: number;
		actions?: any[];
	};
	query?: {
		userId: any;
	};
	token?: IPushToken['token'];
	tokens?: IPushToken['token'][];
	payload?: Record<string, any>;
	delayUntil?: Date;
	createdAt: Date;
	createdBy?: string;
};

export type NativeNotificationParameters = {
	userTokens: string | string[];
	notification: PendingPushNotification;
	_removeToken: (token: string) => void;
	options: RequiredField<PushOptions, 'gcm'>;
};

class PushClass {
	options: PushOptions = {
		uniqueId: '',
	};

	isConfigured = false;

	public configure(options: PushOptions): void {
        /* Implementation Hidden */
    }

	private removeToken(token: string): void {
        /* Implementation Hidden */
    }

	private shouldUseGateway(): boolean {
        /* Implementation Hidden */
    }

	private async sendNotificationNative(
		app: IPushToken,
		notification: PendingPushNotification,
		countApn: string[],
		countGcm: string[],
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async getNativeNotificationAuthorizationCredentials(): Promise<{ token: string; projectId: string }> {
        /* Implementation Hidden */
    }

	private async sendGatewayPush(
		gateway: string,
		service: 'apn' | 'gcm',
		token: string,
		notification: Optional<GatewayNotification, 'uniqueId'>,
		retryOptions: { tries: number; maxRetries: number } = { tries: 0, maxRetries: PUSH_GATEWAY_MAX_RETRIES },
	): Promise<void> {
        /* Implementation Hidden */
    }

	private getGatewayNotificationData(notification: PendingPushNotification): Omit<GatewayNotification, 'uniqueId'> {
        /* Implementation Hidden */
    }

	private async sendNotificationGateway(
		app: IPushToken,
		notification: PendingPushNotification,
		countApn: string[],
		countGcm: string[],
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async sendNotification(
		notification: PendingPushNotification,
		options: { skipTokenId?: IPushToken['_id'] } = {},
	): Promise<{ apn: string[]; gcm: string[] }> {
        /* Implementation Hidden */
    }

	// This is a general function to validate that the data added to notifications
	// is in the correct format. If not this function will throw errors
	private _validateDocument(notification: PendingPushNotification): void {
        /* Implementation Hidden */
    }

	private hasApnOptions(options: IPushNotificationConfig): options is RequiredField<IPushNotificationConfig, 'apn'> {
        /* Implementation Hidden */
    }

	private hasGcmOptions(options: IPushNotificationConfig): options is RequiredField<IPushNotificationConfig, 'gcm'> {
        /* Implementation Hidden */
    }

	public async send(options: IPushNotificationConfig) {
        /* Implementation Hidden */
    }
}

export const Push = new PushClass();

```