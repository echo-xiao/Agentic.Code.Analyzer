## File: packages/core-typings/src/ILivechatTrigger.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export type ILivechatTriggerType = 'time-on-site' | 'page-url' | 'chat-opened-by-visitor' | 'after-guest-registration';

export interface ILivechatTriggerCondition {
	name: ILivechatTriggerType;
	value?: string | number;
}

export interface ILivechatSendMessageAction {
	name: 'send-message';
	params?: {
		sender: 'queue' | 'custom';
		msg: string;
		name: string;
	};
}

export interface ILivechatUseExternalServiceAction {
	name: 'use-external-service';
	params?: {
		sender: 'queue' | 'custom';
		name: string;
		serviceUrl: string;
		serviceTimeout: number;
		serviceFallbackMessage: string;
	};
}

export const isExternalServiceTrigger = (
	trigger: ILivechatTrigger,
): trigger is ILivechatTrigger & { actions: ILivechatUseExternalServiceAction[] } => {
    /* Implementation Hidden */
};

export type ILivechatTriggerAction = ILivechatSendMessageAction | ILivechatUseExternalServiceAction;

export interface ILivechatTrigger extends IRocketChatRecord {
	name: string;
	description: string;
	enabled: boolean;
	runOnce: boolean;
	conditions: ILivechatTriggerCondition[];
	actions: ILivechatTriggerAction[];
}

export interface ILivechatTriggerActionResponse {
	_id: string;
	response: {
		statusCode: number;
		contents: {
			msg: string;
			order: number;
		}[];
	};
}

```