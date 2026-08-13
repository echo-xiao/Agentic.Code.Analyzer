## File: apps/meteor/app/integrations/server/lib/ScriptEngine.ts

```typescript
import type {
	IUser,
	IRoom,
	IMessage,
	IOutgoingIntegration,
	IIncomingIntegration,
	IIntegration,
	IIntegrationHistory,
} from '@rocket.chat/core-typings';
import type { Logger } from '@rocket.chat/logger';
import type { serverFetch } from '@rocket.chat/server-fetch';
import { wrapExceptions } from '@rocket.chat/tools';

import { incomingLogger, outgoingLogger } from '../logger';
import type { IScriptClass, CompiledScript } from './definition';
import { updateHistory } from './updateHistory';

type OutgoingRequestBaseData = {
	token: IOutgoingIntegration['token'];
	bot: boolean;
	trigger_word: string;
};

type OutgoingRequestSendMessageData = OutgoingRequestBaseData & {
	channel_id: string;
	channel_name: string;
	message_id: string;
	timestamp: Date;
	user_id: string;
	user_name: string;
	text: string;
	siteUrl: string;
	alias?: string;
	bot?: boolean;
	isEdited?: true;
	tmid?: string;
};

type OutgoingRequestUploadedFileData = OutgoingRequestBaseData & {
	channel_id: string;
	channel_name: string;
	message_id: string;
	timestamp: Date;
	user_id: string;
	user_name: string;
	text: string;

	user: IUser;
	room: IRoom;
	message: IMessage;

	alias?: string;
	bot?: boolean;
};

type OutgoingRequestRoomCreatedData = OutgoingRequestBaseData & {
	channel_id: string;
	channel_name: string;
	timestamp: Date;
	user_id: string;
	user_name: string;
	owner: IUser;
	room: IRoom;
};

type OutgoingRequestRoomData = OutgoingRequestBaseData & {
	channel_id: string;
	channel_name: string;
	timestamp: Date;
	user_id: string;
	user_name: string;
	owner: IUser;
	room: IRoom;
	bot?: boolean;
};

type OutgoingRequestUserCreatedData = OutgoingRequestBaseData & {
	timestamp: Date;
	user_id: string;
	user_name: string;
	user: IUser;
	bot?: boolean;
};

export type OutgoingRequestData =
	| OutgoingRequestSendMessageData
	| OutgoingRequestUploadedFileData
	| OutgoingRequestRoomCreatedData
	| OutgoingRequestRoomData
	| OutgoingRequestUserCreatedData;

type OutgoingRequest = {
	params: Record<never, never>;
	method: 'POST';
	url: string;
	data: OutgoingRequestData;
	auth: undefined;
	headers: Record<string, string>;
};

type OutgoingRequestFromScript = {
	url?: string;
	headers?: Record<string, string>;
	method?: string;
	message?: {
		text?: string;
		channel?: string;
		attachments?: {
			color?: string;
			author_name?: string;
			author_link?: string;
			author_icon?: string;
			title?: string;
			title_link?: string;
			text?: string;
			fields?: {
				title?: string;
				value?: string;
				short?: boolean;
			}[];
			image_url?: string;
			thumb_url?: string;
		}[];
	};

	auth?: string;
	data?: Record<string, any>;
};

type OutgoingRequestContext = {
	integration: IOutgoingIntegration;
	data: OutgoingRequestData;
	historyId: IIntegrationHistory['_id'];
	url: string;
};

type ProcessedOutgoingRequest = OutgoingRequest | OutgoingRequestFromScript;

type OutgoingResponseContext = {
	integration: IOutgoingIntegration;
	request: ProcessedOutgoingRequest;
	response: Awaited<ReturnType<typeof serverFetch>>;
	content: string;
	historyId: IIntegrationHistory['_id'];
};

type IncomingIntegrationRequest = {
	url: {
		hash: string | null | undefined;
		search: string | null | undefined;
		query: Record<string, any>;
		pathname: string | null | undefined;
		path: string | null | undefined;
	};
	url_raw: string;
	url_params: Record<string, string>;
	content: Record<string, any>;
	content_raw: string;
	headers: Record<string, string>;
	body: Record<string, any>;
	user: Pick<Required<IUser>, '_id' | 'name' | 'username'>;
};

export abstract class IntegrationScriptEngine<IsIncoming extends boolean> {
	protected compiledScripts: Record<IIntegration['_id'], CompiledScript>;

	public get disabled(): boolean {
		return this.isDisabled();
	}

	public get incoming(): IsIncoming {
		return this.isIncoming;
	}

	constructor(private isIncoming: IsIncoming) {
        /* Implementation Hidden */
    }

	public integrationHasValidScript(integration: IIntegration): boolean {
        /* Implementation Hidden */
    }

	// PrepareOutgoingRequest will execute a script to build the request object that will be used for the actual integration request
	// It may also return a message object to be sent to the room where the integration was triggered
	public async prepareOutgoingRequest({ integration, data, historyId, url }: OutgoingRequestContext): Promise<ProcessedOutgoingRequest> {
        /* Implementation Hidden */
    }

	public async processOutgoingResponse({
		integration,
		request,
		response,
		content,
		historyId,
	}: OutgoingResponseContext): Promise<string | false | undefined> {
        /* Implementation Hidden */
    }

	public async processIncomingRequest({
		integration,
		request,
	}: {
		integration: IIncomingIntegration;
		request: IncomingIntegrationRequest;
	}): Promise<any> {
        /* Implementation Hidden */
    }

	protected get logger(): ReturnType<Logger['section']> {
		if (this.isIncoming) {
			return incomingLogger;
		}

		return outgoingLogger;
	}

	protected async executeOutgoingScript(
		integration: IOutgoingIntegration,
		method: keyof IScriptClass,
		params: Record<string, any>,
		historyId: IIntegrationHistory['_id'],
	): Promise<any> {
        /* Implementation Hidden */
    }

	protected async executeIncomingScript(
		integration: IIncomingIntegration,
		method: keyof IScriptClass,
		params: Record<string, any>,
	): Promise<any> {
        /* Implementation Hidden */
    }

	protected async hasScriptAndMethod(integration: IIntegration, method: keyof IScriptClass): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async getScriptSafely(integration: IIntegration): Promise<Partial<IScriptClass> | undefined> {
        /* Implementation Hidden */
    }

	protected abstract isDisabled(): boolean;

	protected abstract runScriptMethod({
		integrationId,
		script,
		method,
		params,
	}: {
		integrationId: IIntegration['_id'];
		script: IScriptClass;
		method: keyof IScriptClass;
		params: Record<string, any>;
	}): Promise<any>;

	protected abstract getIntegrationScript(integration: IIntegration): Promise<Partial<IScriptClass>>;
}

```