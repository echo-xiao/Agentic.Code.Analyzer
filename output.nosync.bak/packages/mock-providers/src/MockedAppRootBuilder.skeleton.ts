## File: packages/mock-providers/src/MockedAppRootBuilder.tsx

```typescript
import type {
	CallPreferences,
	DirectCallData,
	IRoom,
	ISetting,
	IUser,
	ProviderCapabilities,
	Serialized,
	SettingValue,
} from '@rocket.chat/core-typings';
import type {
	ServerMethodName,
	ServerMethodParameters,
	ServerMethodReturn,
	StreamerCallback,
	StreamerCallbackArgs,
	StreamerEvents,
	StreamKeys,
	StreamNames,
} from '@rocket.chat/ddp-client';
import { Emitter } from '@rocket.chat/emitter';
import languages from '@rocket.chat/i18n/dist/languages';
import { createPredicateFromFilter } from '@rocket.chat/mongo-adapter';
import type { Method, OperationParams, OperationResult, PathPattern, UrlParams } from '@rocket.chat/rest-typings';
import type {
	Device,
	DeviceContext,
	LoginService,
	ModalContextValue,
	ServerContextValue,
	SettingsContextQuery,
	SubscriptionWithRoom,
	TranslationKey,
} from '@rocket.chat/ui-contexts';
import {
	AuthorizationContext,
	RouterContext,
	ServerContext,
	SettingsContext,
	TranslationContext,
	UserContext,
	ActionManagerContext,
	ModalContext,
	UserPresenceContext,
	AuthenticationContext,
} from '@rocket.chat/ui-contexts';
import type { VideoConfPopupPayload } from '@rocket.chat/ui-video-conf';
import { VideoConfContext } from '@rocket.chat/ui-video-conf';
import type { Decorator } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createInstance } from 'i18next';
import type { ObjectId } from 'mongodb';
import type { ContextType, JSXElementConstructor, ReactNode } from 'react';
import { useEffect, useReducer, useSyncExternalStore } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { MockedDeviceContext } from './MockedDeviceContext';

type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};

// eslint-disable-next-line @typescript-eslint/naming-convention
// interface MockedAppRootEvents extends Record<`stream-${StreamNames}-${StreamKeys<StreamNames>}`, any> {
// 	'update-modal': void;
// }
// Extract all key values from objects that have a 'key' property
type ExtractKeys<T, N extends string> = T extends readonly (infer U)[]
	? U extends { key: infer K }
		? K extends string
			? string extends K
				? never
				: `stream-${N}-${K}`
			: never
		: never
	: never;

// Union of all key values from all streams
type AllStreamerEventKeys = {
	[K in keyof StreamerEvents]: ExtractKeys<StreamerEvents[K], K>;
}[keyof StreamerEvents];

type MockedAppRootEvents = {
	'update-modal': void;
} & Record<AllStreamerEventKeys, any>;

export type StreamControllerRef<N extends StreamNames> = {
	controller?: {
		emit: <K extends StreamKeys<N>>(eventName: K, args: StreamerCallbackArgs<N, K>) => void;
		has: (eventName: StreamKeys<N>) => boolean;
	};
};

const empty = [] as const;

export class MockedAppRootBuilder {
	private _settings: Map<string, ISetting> = new Map();

	private wrappers: Array<(children: ReactNode) => ReactNode> = [];

	private server: ContextType<typeof ServerContext> = {
		connected: true,
		status: 'connected',
		retryCount: 0,
		info: undefined,
		absoluteUrl: (path: string) => `http://localhost:3000/${path}`,
		callEndpoint: <TMethod extends Method, TPathPattern extends PathPattern>({
			method,
			pathPattern,
		}: {
			method: TMethod;
			pathPattern: TPathPattern;
			keys: UrlParams<TPathPattern>;
			params: OperationParams<TMethod, TPathPattern>;
		}): Promise<Serialized<OperationResult<TMethod, TPathPattern>>> => {
			throw new Error(`not implemented (method: ${method}, pathPattern: ${pathPattern})`);
		},
		getStream: () => () => () => undefined,
		getStreamAll: () => () => () => undefined,
		uploadToEndpoint: () => Promise.reject(new Error('not implemented')),
		callMethod: () => Promise.reject(new Error('not implemented')),
		disconnect: () => {
			throw new Error('not implemented');
		},
		reconnect: () => {
			throw new Error('not implemented');
		},
		writeStream: () => {
			throw new Error('not implemented');
		},
	};

	private router: ContextType<typeof RouterContext> = {
		buildRoutePath: () => '/',
		defineRoutes: () => () => undefined,
		getLocationPathname: () => '/',
		getLocationSearch: () => '',
		getLocationHash: () => '',
		getRouteName: () => undefined,
		getPreviousRouteName: () => undefined,
		getRouteParameters: () => ({}),
		getSearchParameters: () => ({}),
		navigate: () => undefined,
		subscribeToRouteChange: () => () => undefined,
		getRoomRoute: () => ({ path: '/' }),
	};

	private settings: Mutable<ContextType<typeof SettingsContext>> = {
		hasPrivateAccess: true,
		querySetting: (_id: string) => [() => () => undefined, () => undefined],
		querySettings: (_query: SettingsContextQuery) => [() => () => undefined, () => empty as unknown as ISetting[]],
		dispatch: async () => undefined,
	};

	private user: ContextType<typeof UserContext> = {
		logout: () => Promise.reject(new Error('not implemented')),
		onLogout: () => () => undefined,
		queryPreference: () => [() => () => undefined, () => undefined],
		queryRoom: () => [() => () => undefined, () => this.room],
		querySubscription: () => [() => () => undefined, () => this.subscription],
		querySubscriptions: () => [
			() => () => undefined,
			() => (this.subscription ? [this.subscription, ...(this.subscriptions ?? [])] : (this.subscriptions ?? [])),
		], // apply query and option
		user: null,
		userId: undefined,
	};

	private userPresence: ContextType<typeof UserPresenceContext> = {
		queryUserData: (_uid) => ({ subscribe: () => () => undefined, get: () => undefined }),
	};

	private videoConf: ContextType<typeof VideoConfContext> = {
		queryIncomingCalls: () => [() => () => undefined, () => []],
		queryRinging: () => [() => () => undefined, () => false],
		queryCalling: () => [() => () => undefined, () => false],
		dispatchOutgoing(_options: Omit<VideoConfPopupPayload, 'id'>): void {
			throw new Error('Function not implemented.');
		},
		dismissOutgoing(): void {
			throw new Error('Function not implemented.');
		},
		startCall(_rid: IRoom['_id'], _title?: string): void {
			throw new Error('Function not implemented.');
		},
		acceptCall(_callId: string): void {
			throw new Error('Function not implemented.');
		},
		joinCall(_callId: string): void {
			throw new Error('Function not implemented.');
		},
		dismissCall(_callId: string): void {
			throw new Error('Function not implemented.');
		},
		rejectIncomingCall(_callId: string): void {
			throw new Error('Function not implemented.');
		},
		abortCall(): void {
			throw new Error('Function not implemented.');
		},
		setPreferences(_prefs: { mic?: boolean; cam?: boolean }): void {
			throw new Error('Function not implemented.');
		},
		loadCapabilities(): Promise<void> {
			throw new Error('Function not implemented.');
		},
		queryCapabilities(): [subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => ProviderCapabilities] {
			throw new Error('Function not implemented.');
		},
		queryPreferences(): [subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => CallPreferences] {
			throw new Error('Function not implemented.');
		},
	};

	private room: IRoom | undefined = undefined;

	private subscriptions: SubscriptionWithRoom[] | undefined = undefined;

	private subscription: SubscriptionWithRoom | undefined = undefined;

	private modal: ModalContextValue = {
		currentModal: { component: null },
		modal: {
			setModal: (modal) => {
				this.modal = {
					...this.modal,
					currentModal: { component: modal },
				};
				this.events.emit('update-modal');
			},
		},
	};

	private authorization: ContextType<typeof AuthorizationContext> = (() => {
		const dummyRolesMap: ReturnType<ContextType<typeof AuthorizationContext>['getRoles']> = new Map();

		return {
			queryPermission: () => [() => () => undefined, () => false],
			queryAtLeastOnePermission: () => [() => () => undefined, () => false],
			queryAllPermissions: () => [() => () => undefined, () => false],
			queryRole: () => [() => () => undefined, () => false],
			getRoles: () => dummyRolesMap,
			subscribeToRoles: () => () => undefined,
		};
	})();

	private authServices: LoginService[] = [];

	private authentication: ContextType<typeof AuthenticationContext> = {
		isLoggingIn: false,
		loginWithPassword: () => Promise.resolve(),
		loginWithToken: () => Promise.resolve(),
		loginWithService: () => () => Promise.resolve(true),
		loginWithCustomOauth: () => undefined,
		loginWithIframe: async () => Promise.reject('loginWithIframe not implemented'),
		loginWithTokenRoute: async () => Promise.reject('loginWithTokenRoute not implemented'),
		queryLoginServices: {
			getCurrentValue: () => this.authServices,
			subscribe: () => () => undefined,
		},
		getLoginToken: () => null,
		unstoreLoginToken: () => () => undefined,
		wipeLocalAuth: () => undefined,
	};

	private events = new Emitter<MockedAppRootEvents>();

	private deviceContext: Partial<ContextType<typeof DeviceContext>> = {
		enabled: true,
		availableAudioOutputDevices: [],
		availableAudioInputDevices: [],
		selectedAudioOutputDevice: undefined,
		selectedAudioInputDevice: undefined,
		setAudioOutputDevice: () => undefined,
		setAudioInputDevice: () => undefined,
		permissionStatus: undefined,
	};

	private _providedQueryClient: QueryClient | undefined;

	private get queryClient(): QueryClient {
		return (
			this._providedQueryClient ||
			new QueryClient({
				defaultOptions: {
					queries: { retry: false },
					mutations: { retry: false },
				},
			})
		);
	}

	wrap(wrapper: (children: ReactNode) => ReactNode): this {
        /* Implementation Hidden */
    }

	withEndpoint<TMethod extends Method, TPathPattern extends PathPattern>(
		method: TMethod,
		pathPattern: TPathPattern,
		response: (
			params: OperationParams<TMethod, TPathPattern>,
		) => Serialized<OperationResult<TMethod, TPathPattern>> | Promise<Serialized<OperationResult<TMethod, TPathPattern>>>,
	): this {
        /* Implementation Hidden */
    }

	withStream<N extends StreamNames>(streamName: N, ref: StreamControllerRef<N>): this {
        /* Implementation Hidden */
    }

	withMethod<TMethodName extends ServerMethodName>(methodName: TMethodName, response: () => ServerMethodReturn<TMethodName>): this {
        /* Implementation Hidden */
    }

	withPermission(permission: string): this {
        /* Implementation Hidden */
    }

	withJohnDoe(overrides: Partial<IUser> = {}): this {
        /* Implementation Hidden */
    }

	withAnonymous(): this {
        /* Implementation Hidden */
    }

	withUser(user: IUser): this {
        /* Implementation Hidden */
    }

	withUsers(users: IUser[]): this {
        /* Implementation Hidden */
    }

	withSubscriptions(subscriptions: SubscriptionWithRoom[]): this {
        /* Implementation Hidden */
    }

	withSubscription(subscription: SubscriptionWithRoom): this {
        /* Implementation Hidden */
    }

	withRoom(room: IRoom): this {
        /* Implementation Hidden */
    }

	withRouter(overrides: Partial<ContextType<typeof RouterContext>>): this {
        /* Implementation Hidden */
    }

	withRouteParameter(name: string, value: string): this {
        /* Implementation Hidden */
    }

	withRole(role: string): this {
        /* Implementation Hidden */
    }

	withSetting(id: string, value: SettingValue, settingStructure?: Partial<ISetting>): this {
        /* Implementation Hidden */
    }

	withUserPreference(id: string | ObjectId, value: unknown): this {
        /* Implementation Hidden */
    }

	withIncomingCalls(calls: DirectCallData[]): this {
        /* Implementation Hidden */
    }

	withOpenModal(modal: ReactNode) {
        /* Implementation Hidden */
    }

	withAudioInputDevices(devices: Device[]): this {
        /* Implementation Hidden */
    }

	withAudioOutputDevices(devices: Device[]): this {
        /* Implementation Hidden */
    }

	withMicrophonePermissionState(status: PermissionStatus): this {
        /* Implementation Hidden */
    }

	private i18n = createInstance({
		// debug: true,
		lng: 'en',
		fallbackLng: 'en',
		ns: ['core'],
		nsSeparator: '.',
		partialBundledLanguages: true,
		defaultNS: 'core',
		interpolation: {
			escapeValue: false,
		},
		initImmediate: false,
	}).use(initReactI18next);

	withTranslations(lng: string, ns: string, resources: Record<string, string>): this {
        /* Implementation Hidden */
    }

	// Manually changes the language in the i18next instance
	// To be used with languages other than the default one
	withDefaultLanguage(lng: string): this {
        /* Implementation Hidden */
    }

	withServerContext(partial: Partial<ServerContextValue>): this {
        /* Implementation Hidden */
    }

	withQueryClient(client: QueryClient): this {
        /* Implementation Hidden */
    }

	build(): JSXElementConstructor<{ children: ReactNode }> {
        /* Implementation Hidden */
    }

	buildStoryDecorator(): Decorator {
        /* Implementation Hidden */
    }
}

```