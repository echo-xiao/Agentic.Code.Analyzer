## File: apps/meteor/server/api/ApiClass.ts

```typescript
import type { IMethodConnection, IUser } from '@rocket.chat/core-typings';
import type { Route, Router } from '@rocket.chat/http-router';
import { License } from '@rocket.chat/license';
import { Logger } from '@rocket.chat/logger';
import { Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import type { JoinPathPattern, Method } from '@rocket.chat/rest-typings';
import { ajv } from '@rocket.chat/rest-typings';
import { wrapExceptions } from '@rocket.chat/tools';
import type { ValidateFunction } from 'ajv';
import { Accounts } from 'meteor/accounts-base';
import { DDP } from 'meteor/ddp';
// eslint-disable-next-line import/no-duplicates
import { DDPCommon } from 'meteor/ddp-common';
import { Meteor } from 'meteor/meteor';
import type { RateLimiterOptionsToCheck } from 'meteor/rate-limit';
// eslint-disable-next-line import/no-duplicates
import { RateLimiter } from 'meteor/rate-limit';
import _ from 'underscore';

import { checkPermissions, parseDeprecation } from './api.helpers';
import type {
	FailureResult,
	ForbiddenResult,
	InnerAction,
	InternalError,
	NotFoundResult,
	Operations,
	Options,
	SuccessResult,
	TypedThis,
	TypedAction,
	TypedOptions,
	UnauthorizedResult,
	RedirectStatusCodes,
	RedirectResult,
	UnavailableResult,
	GenericRouteExecutionContext,
	TooManyRequestsResult,
	SuccessStatusCodes,
} from './definition';
import { getUserInfo } from './lib/getUserInfo';
import { parseJsonQuery } from './lib/parseJsonQuery';
import type { APIActionContext } from './router';
import { RocketChatAPIRouter } from './router';
import { notifyOnUserChangeAsync } from '../../app/lib/server/lib/notifyListener';
import { settings } from '../../app/settings/server';
import { getNestedProp } from '../lib/getNestedProp';
import { authenticationMiddlewareForHono } from './v1/middlewares/authenticationHono';
import { permissionsMiddleware } from './v1/middlewares/permissions';
import { checkCodeForUser } from '../../app/2fa/server/code';
import { getDefaultUserFields } from '../../app/utils/server/functions/getDefaultUserFields';
import { license } from '../../ee/server/api/v1/middlewares/license';
import { isObject } from '../../lib/utils/isObject';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { shouldBreakInVersion } from '../lib/shouldBreakInVersion';

const logger = new Logger('API');

// We have some breaking changes planned to the API.
// To avoid conflicts or missing something during the period we are adopting a 'feature flag approach'
// TODO: MAJOR check if this is still needed
export const applyBreakingChanges = shouldBreakInVersion('9.0.0');
type MinimalRoute = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	path: string;
} & TypedOptions;

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & unknown;

type ExtractValidation<T> = T extends ValidateFunction<infer TSchema> ? TSchema : never;

type UnionToIntersection<U> = (U extends any ? (x: U) => any : never) extends (x: infer I) => any ? I : never;

export type ExtractRoutesFromAPI<T> = Prettify<
	UnionToIntersection<
		T extends APIClass<any, infer TOperations> ? (TOperations extends MinimalRoute ? Prettify<ConvertToRoute<TOperations>> : never) : never
	>
>;

type ConvertToRoute<TRoute extends MinimalRoute> = {
	[K in TRoute['path']]: {
		[K2 in Extract<TRoute, { path: K }>['method']]: K2 extends 'GET' | 'DELETE'
			? (
					...args: [ExtractValidation<Extract<TRoute, { path: K; method: K2 }>['query']>] extends [never]
						? [params?: never]
						: [params: ExtractValidation<Extract<TRoute, { path: K; method: K2 }>['query']>]
				) => ExtractValidation<Extract<TRoute, { path: K; method: K2 }>['response'][200]>
			: K2 extends 'POST' | 'PUT'
				? (
						params: ExtractValidation<Extract<TRoute, { path: K; method: K2 }>['body']>,
					) => ExtractValidation<
						200 extends keyof Extract<TRoute, { path: K; method: K2 }>['response']
							? Extract<TRoute, { path: K; method: K2 }>['response'][200]
							: 201 extends keyof Extract<TRoute, { path: K; method: K2 }>['response']
								? Extract<TRoute, { path: K; method: K2 }>['response'][201]
								: never
					>
				: never;
	};
};

interface IAPIProperties {
	useDefaultAuth: boolean;
	prettyJson: boolean;
	version?: string;
	enableCors?: boolean;
	apiPath?: string;
}

interface IAPIDefaultFieldsToExclude {
	avatarOrigin: number;
	emails: number;
	phone: number;
	statusConnection: number;
	createdAt: number;
	lastLogin: number;
	services: number;
	requirePasswordChange: number;
	requirePasswordChangeReason: number;
	roles: number;
	statusDefault: number;
	_updatedAt: number;
	settings: number;
	inviteToken: number;
}

export type RateLimiterOptions = {
	numRequestsAllowed?: number;
	intervalTimeInMS?: number;
};

export const defaultRateLimiterOptions: RateLimiterOptions = {
	numRequestsAllowed: settings.get<number>('API_Enable_Rate_Limiter_Limit_Calls_Default'),
	intervalTimeInMS: settings.get<number>('API_Enable_Rate_Limiter_Limit_Time_Default'),
};
const rateLimiterDictionary: Record<
	string,
	{
		rateLimiter: RateLimiter;
		options: RateLimiterOptions;
	}
> = {};

const generateConnection = (
	ipAddress: string,
	httpHeaders: Record<string, any>,
): {
	id: string;
	close: () => void;
	clientAddress: string;
	httpHeaders: Record<string, any>;
} => ({
	id: Random.id(),
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	close() {},
	httpHeaders,
	clientAddress: ipAddress,
});

export class APIClass<TBasePath extends string = '', TOperations extends Record<string, unknown> = Record<string, never>> {
	public typedRoutes: Record<string, Record<string, Route>> = {};

	protected apiPath?: string;

	readonly version?: string;

	private _routes: { path: string; options: Options; endpoints: Record<string, string> }[] = [];

	public authMethods: ((routeContext: APIActionContext) => Promise<IUser | undefined>)[];

	protected helperMethods: Map<string, () => any> = new Map();

	public fieldSeparator: string;

	public defaultFieldsToExclude: {
		joinCode: number;
		members: number;
		importIds: number;
		e2e: number;
	};

	public defaultLimitedUserFieldsToExclude: IAPIDefaultFieldsToExclude;

	public limitedUserFieldsToExclude: IAPIDefaultFieldsToExclude;

	public limitedUserFieldsToExcludeIfIsPrivilegedUser: {
		services: number;
		inviteToken: number;
	};

	readonly router: Router<any, any, any>;

	constructor({ useDefaultAuth, ...properties }: IAPIProperties) {
        /* Implementation Hidden */
    }

	public setLimitedCustomFields(customFields: string[]): void {
        /* Implementation Hidden */
    }

	async parseJsonQuery(routeContext: GenericRouteExecutionContext) {
        /* Implementation Hidden */
    }

	public addAuthMethod(func: (routeContext: APIActionContext) => Promise<IUser | undefined>): void {
        /* Implementation Hidden */
    }

	protected shouldAddRateLimitToRoute(options: { rateLimiterOptions?: RateLimiterOptions | boolean }): boolean {
        /* Implementation Hidden */
    }

	public success(): SuccessResult<void>;

	public success<T>(result: T, statusCode?: SuccessStatusCodes): SuccessResult<T>;

	public success<T>(result: T = {} as T, statusCode: SuccessStatusCodes = 200): SuccessResult<T> {
        /* Implementation Hidden */
    }

	public redirect<T, C extends RedirectStatusCodes>(code: C, result: T): RedirectResult<T, C> {
        /* Implementation Hidden */
    }

	public failure(): FailureResult<string>;

	public failure<T>(result?: T): FailureResult<T>;

	public failure<T, TErrorType extends string, TStack extends string, TErrorDetails>(
		result?: T,
		errorType?: TErrorType,
		stack?: TStack,
		error?: { details: TErrorDetails },
	): FailureResult<T, TErrorType, TStack, TErrorDetails>;

	public failure<T, TErrorType extends string, TStack extends string, TErrorDetails>(
		result?: T,
		errorType?: TErrorType,
		stack?: TStack,
		error?: { details: TErrorDetails },
	): FailureResult<T> {
        /* Implementation Hidden */
    }

	public notFound(msg?: string): NotFoundResult {
        /* Implementation Hidden */
    }

	public internalError(): InternalError<never>;

	public internalError<T>(msg: T): InternalError<T>;

	public internalError<T>(msg?: T): InternalError<T> {
        /* Implementation Hidden */
    }

	public unavailable<T>(msg?: T): UnavailableResult<T> {
        /* Implementation Hidden */
    }

	public unauthorized(): UnauthorizedResult<string>;

	public unauthorized<T>(msg: T): UnauthorizedResult<T>;

	public unauthorized<T>(msg?: T): UnauthorizedResult<T> {
        /* Implementation Hidden */
    }

	public forbidden(): ForbiddenResult<string>;

	public forbidden<T>(msg: T): ForbiddenResult<T>;

	public forbidden<T>(msg?: T): ForbiddenResult<T> {
        /* Implementation Hidden */
    }

	public tooManyRequests<T>(msg?: T): TooManyRequestsResult<T> {
        /* Implementation Hidden */
    }

	protected getRateLimiter(route: string): { rateLimiter: RateLimiter; options: RateLimiterOptions } {
        /* Implementation Hidden */
    }

	protected async shouldVerifyRateLimit(route: string, userId?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async enforceRateLimit(
		objectForRateLimitMatch: RateLimiterOptionsToCheck,
		_: any,
		response: Response,
		userId?: string,
	): Promise<void> {
        /* Implementation Hidden */
    }

	public reloadRoutesToRefreshRateLimiter(): void {
        /* Implementation Hidden */
    }

	protected addRateLimiterRuleForRoutes({
		routes,
		rateLimiterOptions,
		endpoints,
	}: {
		routes: string[];
		rateLimiterOptions: RateLimiterOptions | boolean;
		endpoints: Record<string, string> | string[];
	}): void {
        /* Implementation Hidden */
    }

	public async processTwoFactor({
		userId,
		request,
		options,
		connection,
	}: {
		userId: string;
		request: Request;
		options?: Options;
		connection: IMethodConnection;
	}): Promise<boolean> {
        /* Implementation Hidden */
    }

	public getFullRouteName(route: string, method: string): string {
        /* Implementation Hidden */
    }

	protected namedRoutes(route: string, endpoints: Record<string, string> | string[]): string[] {
        /* Implementation Hidden */
    }

	private registerTypedRoutesLegacy<TSubPathPattern extends string, TOptions extends Options>(
		method: Method,
		subpath: TSubPathPattern,
		options: TOptions,
	): void {
        /* Implementation Hidden */
    }

	private registerTypedRoutes<
		TSubPathPattern extends string,
		TOptions extends TypedOptions,
		TPathPattern extends `${TBasePath}/${TSubPathPattern}`,
	>(method: MinimalRoute['method'], subpath: TSubPathPattern, options: TOptions): void {
        /* Implementation Hidden */
    }

	private method<TSubPathPattern extends string, TOptions extends TypedOptions, TPathPattern extends `${TBasePath}/${TSubPathPattern}`>(
		method: MinimalRoute['method'],
		subpath: TSubPathPattern,
		options: TOptions,
		action: TypedAction<TOptions, TSubPathPattern>,
	): APIClass<
		TBasePath,
		| TOperations
		| Prettify<
				{
					method: Method;
					path: TPathPattern;
				} & Omit<TOptions, 'response'>
		  >
	> {
        /* Implementation Hidden */
    }

	get<TSubPathPattern extends string, TOptions extends TypedOptions, TPathPattern extends `${TBasePath}/${TSubPathPattern}`>(
		subpath: TSubPathPattern,
		options: TOptions,
		action: TypedAction<TOptions, TSubPathPattern>,
	): APIClass<
		TBasePath,
		| TOperations
		| Prettify<
				{
					method: 'GET';
					path: TPathPattern;
				} & TOptions
		  >
	> {
        /* Implementation Hidden */
    }

	post<TSubPathPattern extends string, TOptions extends TypedOptions, TPathPattern extends `${TBasePath}/${TSubPathPattern}`>(
		subpath: TSubPathPattern,
		options: TOptions,
		action: TypedAction<TOptions, TSubPathPattern>,
	): APIClass<
		TBasePath,
		| TOperations
		| ({
				method: 'POST';
				path: TPathPattern;
		  } & Omit<TOptions, 'response'>)
		| Prettify<
				{
					method: 'POST';
					path: TPathPattern;
				} & TOptions
		  >
	> {
        /* Implementation Hidden */
    }

	put<TSubPathPattern extends string, TOptions extends TypedOptions, TPathPattern extends `${TBasePath}/${TSubPathPattern}`>(
		subpath: TSubPathPattern,
		options: TOptions,
		action: TypedAction<TOptions, TSubPathPattern>,
	): APIClass<
		TBasePath,
		| TOperations
		| ({
				method: 'PUT';
				path: TPathPattern;
		  } & Omit<TOptions, 'response'>)
		| Prettify<
				{
					method: 'PUT';
					path: TPathPattern;
				} & TOptions
		  >
	> {
        /* Implementation Hidden */
    }

	delete<TSubPathPattern extends string, TOptions extends TypedOptions, TPathPattern extends `${TBasePath}/${TSubPathPattern}`>(
		subpath: TSubPathPattern,
		options: TOptions,
		action: TypedAction<TOptions, TSubPathPattern>,
	): APIClass<
		TBasePath,
		| TOperations
		| ({
				method: 'DELETE';
				path: TPathPattern;
		  } & Omit<TOptions, 'response'>)
		| Prettify<
				{
					method: 'DELETE';
					path: TPathPattern;
				} & TOptions
		  >
	> {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated The addRoute method is deprecated. Please use the new route registration methods (get, post, put OR delete).
	 */
	addRoute<TSubPathPattern extends string>(
		subpath: TSubPathPattern,
		operations: Operations<JoinPathPattern<TBasePath, TSubPathPattern>>,
	): void;

	/**
	 * @deprecated The addRoute method is deprecated. Please use the new route registration methods (get, post, put OR delete).
	 */
	addRoute<TSubPathPattern extends string, TPathPattern extends JoinPathPattern<TBasePath, TSubPathPattern>>(
		subpaths: TSubPathPattern[],
		operations: Operations<TPathPattern>,
	): void;

	/**
	 * @deprecated The addRoute method is deprecated. Please use the new route registration methods (get, post, put OR delete).
	 */
	addRoute<TSubPathPattern extends string, TOptions extends Options>(
		subpath: TSubPathPattern,
		options: TOptions,
		operations: Operations<JoinPathPattern<TBasePath, TSubPathPattern>, TOptions>,
	): void;

	/**
	 * @deprecated The addRoute method is deprecated. Please use the new route registration methods (get, post, put OR delete).
	 */
	addRoute<TSubPathPattern extends string, TPathPattern extends JoinPathPattern<TBasePath, TSubPathPattern>, TOptions extends Options>(
		subpaths: TSubPathPattern[],
		options: TOptions,
		operations: Operations<TPathPattern, TOptions>,
	): void;

	/**
	 * @deprecated The addRoute method is deprecated. Please use the new route registration methods (get, post, put OR delete).
	 */
	public addRoute<
		TSubPathPattern extends string,
		TPathPattern extends JoinPathPattern<TBasePath, TSubPathPattern>,
		TOptions extends Options,
	>(subpaths: TSubPathPattern[], options: TOptions, endpoints?: Operations<TPathPattern, TOptions>): void {
        /* Implementation Hidden */
    }

	public async authenticatedRoute(routeContext: APIActionContext): Promise<IUser | null> {
        /* Implementation Hidden */
    }

	public updateRateLimiterDictionaryForRoute(route: string, numRequestsAllowed: number, intervalTimeInMS?: number): void {
        /* Implementation Hidden */
    }

	protected _initAuth(): void {
        /* Implementation Hidden */
    }

	static createMeteorInvocation(
		connection: {
			id: string;
			close: () => void;
			clientAddress: string;
			httpHeaders: Record<string, any>;
		},
		userId?: string,
		token?: string,
	) {
        /* Implementation Hidden */
    }
}

```