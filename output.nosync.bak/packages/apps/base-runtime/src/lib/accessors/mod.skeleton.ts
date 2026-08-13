## File: packages/apps/base-runtime/src/lib/accessors/mod.ts

```typescript
import type { IApiExtend } from '@rocket.chat/apps-engine/definition/accessors/IApiExtend';
import type { IAppAccessors } from '@rocket.chat/apps-engine/definition/accessors/IAppAccessors';
import type { IConfigurationExtend } from '@rocket.chat/apps-engine/definition/accessors/IConfigurationExtend';
import type { IConfigurationModify } from '@rocket.chat/apps-engine/definition/accessors/IConfigurationModify';
import type { IEnvironmentRead } from '@rocket.chat/apps-engine/definition/accessors/IEnvironmentRead';
import type { IEnvironmentWrite } from '@rocket.chat/apps-engine/definition/accessors/IEnvironmentWrite';
import type { IHttp, IHttpExtend } from '@rocket.chat/apps-engine/definition/accessors/IHttp';
import type { IModify } from '@rocket.chat/apps-engine/definition/accessors/IModify';
import type { INotifier } from '@rocket.chat/apps-engine/definition/accessors/INotifier';
import type { IOutboundCommunicationProviderExtend } from '@rocket.chat/apps-engine/definition/accessors/IOutboundCommunicationProviderExtend';
import type { IPersistence } from '@rocket.chat/apps-engine/definition/accessors/IPersistence';
import type { IRead } from '@rocket.chat/apps-engine/definition/accessors/IRead';
import type { ISchedulerExtend } from '@rocket.chat/apps-engine/definition/accessors/ISchedulerExtend';
import type { ISlashCommandsExtend } from '@rocket.chat/apps-engine/definition/accessors/ISlashCommandsExtend';
import type { ISlashCommandsModify } from '@rocket.chat/apps-engine/definition/accessors/ISlashCommandsModify';
import type { IVideoConfProvidersExtend } from '@rocket.chat/apps-engine/definition/accessors/IVideoConfProvidersExtend';
import type { IApi } from '@rocket.chat/apps-engine/definition/api/IApi';
import type { IApiEndpointMetadata } from '@rocket.chat/apps-engine/definition/api/IApiEndpointMetadata';
import type {
	IOutboundPhoneMessageProvider,
	IOutboundEmailMessageProvider,
} from '@rocket.chat/apps-engine/definition/outboundCommunication/IOutboundCommsProvider';
import type { IProcessor } from '@rocket.chat/apps-engine/definition/scheduler/IProcessor';
import type { ISlashCommand } from '@rocket.chat/apps-engine/definition/slashcommands/ISlashCommand';
import type { IVideoConfProvider } from '@rocket.chat/apps-engine/definition/videoConfProviders/IVideoConfProvider';

import { HttpExtend } from './extenders/HttpExtender';
import { formatErrorResponse } from './formatResponseErrorHandler';
import { Http } from './http';
import { AppObjectRegistry } from '../../AppObjectRegistry';
import * as Messenger from '../messenger';
import { ModifyCreator } from './modify/ModifyCreator';
import { ModifyExtender } from './modify/ModifyExtender';
import { ModifyUpdater } from './modify/ModifyUpdater';
import { Notifier } from './notifier';

/** Helper: extends T with an internal _proxy property used for delegation. */
type WithProxy<T> = T & { _proxy: T };

const httpMethods = ['get', 'post', 'put', 'delete', 'head', 'options', 'patch'] as const;

// We need to create this object first thing, as we'll handle references to it later on
if (!AppObjectRegistry.has('apiEndpoints')) {
	AppObjectRegistry.set('apiEndpoints', []);
}

export class AppAccessors {
	private defaultAppAccessors?: IAppAccessors;

	private environmentRead?: IEnvironmentRead;

	private environmentWriter?: IEnvironmentWrite;

	private configModifier?: IConfigurationModify;

	private configExtender?: IConfigurationExtend;

	private reader?: IRead;

	private modifier?: IModify;

	private persistence?: IPersistence;

	private creator?: ModifyCreator;

	private updater?: ModifyUpdater;

	private extender?: ModifyExtender;

	private httpExtend: IHttpExtend = new HttpExtend();

	private http?: IHttp;

	private notifier?: INotifier;

	private proxify: <T>(namespace: string, overrides?: Record<string, (...args: unknown[]) => unknown>) => T;

	constructor(private readonly senderFn: typeof Messenger.sendRequest) {
        /* Implementation Hidden */
    }

	public getSenderFn() {
        /* Implementation Hidden */
    }

	public getEnvironmentRead(): IEnvironmentRead {
        /* Implementation Hidden */
    }

	public getEnvironmentWrite() {
        /* Implementation Hidden */
    }

	public getConfigurationModify() {
        /* Implementation Hidden */
    }

	public getConfigurationExtend() {
        /* Implementation Hidden */
    }

	public getDefaultAppAccessors() {
        /* Implementation Hidden */
    }

	public getReader() {
        /* Implementation Hidden */
    }

	public getModifier() {
        /* Implementation Hidden */
    }

	public getPersistence() {
        /* Implementation Hidden */
    }

	public getHttp() {
        /* Implementation Hidden */
    }

	private getCreator() {
        /* Implementation Hidden */
    }

	private getUpdater() {
        /* Implementation Hidden */
    }

	private getExtender() {
        /* Implementation Hidden */
    }

	private getNotifier() {
        /* Implementation Hidden */
    }
}

export const AppAccessorsInstance = new AppAccessors(Messenger.sendRequest);

```