## File: packages/api-client/src/index.ts

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import type {
	MatchPathPattern,
	ParamsFor,
	OperationResult,
	PathFor,
	PathWithoutParamsFor,
	PathWithParamsFor,
} from '@rocket.chat/rest-typings';
import { stringify } from 'query-string';

import type { Credentials } from './Credentials';
import type { Middleware, RestClientInterface } from './RestClientInterface';
import { hasRequiredTwoFactorMethod, isTotpInvalidError, isTotpRequiredError } from './errors';

export type { RestClientInterface, Credentials };

const pipe =
	<T extends (...args: any[]) => any>(fn: T) =>
	(...args: Parameters<T>): ReturnType<T> =>
		fn(...args);

function buildFormData(data?: Record<string, any> | void, formData = new FormData(), parentKey?: string): FormData {
    /* Implementation Hidden */
}

const checkIfIsFormData = (data: any = {}): boolean => {
    /* Implementation Hidden */
};

export class RestClient implements RestClientInterface {
	private twoFactorHandler?: (args: {
		method: 'totp' | 'email' | 'password';
		emailOrUsername?: string;
		invalidAttempt?: boolean;
	}) => Promise<string>;

	private readonly baseUrl: string;

	private headers: Record<string, string> = {};

	private credentials: Credentials | undefined;

	constructor({ baseUrl, credentials, headers = {} }: { baseUrl: string; credentials?: Credentials; headers?: Record<string, string> }) {
        /* Implementation Hidden */
    }

	getCredentials(): ReturnType<RestClientInterface['getCredentials']> {
        /* Implementation Hidden */
    }

	setCredentials: RestClientInterface['setCredentials'] = (credentials) => {
		this.credentials = credentials;
	};

	get<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathWithParamsFor<'GET'> = PathWithParamsFor<'GET'>>(
		endpoint: TPath,
		params: ParamsFor<'GET', TPathPattern>,
		options?: Omit<RequestInit, 'method'>,
	): Promise<Serialized<OperationResult<'GET', TPathPattern>>>;

	get<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathWithoutParamsFor<'GET'> = PathWithoutParamsFor<'GET'>>(
		endpoint: TPath,
		params?: undefined,
		options?: Omit<RequestInit, 'method'>,
	): Promise<Serialized<OperationResult<'GET', TPathPattern>>>;

	async get<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathFor<'GET'>>(
		endpoint: TPath,
		params?: ParamsFor<'GET', TPathPattern>,
		options?: Omit<RequestInit, 'method'>,
	): Promise<Serialized<OperationResult<'GET', TPathPattern>>> {
        /* Implementation Hidden */
    }

	post<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathWithParamsFor<'POST'> = PathWithParamsFor<'POST'>>(
		endpoint: TPath,
		params: ParamsFor<'POST', TPathPattern>,
		options?: Omit<RequestInit, 'method'>,
	): Promise<Serialized<OperationResult<'POST', TPathPattern>>>;

	post<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathWithoutParamsFor<'POST'> = PathWithoutParamsFor<'POST'>>(
		endpoint: TPath,
		params?: undefined,
		options?: Omit<RequestInit, 'method'>,
	): Promise<Serialized<OperationResult<'POST', TPathPattern>>>;

	async post<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathFor<'POST'>>(
		endpoint: TPath,
		params?: ParamsFor<'POST', TPathPattern>,
		{ headers, ...options }: Omit<RequestInit, 'method'> = {},
	): Promise<Serialized<OperationResult<'POST', TPathPattern>>> {
        /* Implementation Hidden */
    }

	put<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathWithParamsFor<'PUT'> = PathWithParamsFor<'PUT'>>(
		endpoint: TPath,
		params: ParamsFor<'PUT', TPathPattern>,
		options?: Omit<RequestInit, 'method'>,
	): Promise<Serialized<OperationResult<'PUT', TPathPattern>>>;

	put<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathWithoutParamsFor<'PUT'> = PathWithoutParamsFor<'PUT'>>(
		endpoint: TPath,
		params?: undefined,
		options?: Omit<RequestInit, 'method'>,
	): Promise<Serialized<OperationResult<'PUT', TPathPattern>>>;

	async put<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathFor<'PUT'>>(
		endpoint: TPath,
		params?: ParamsFor<'PUT', TPathPattern>,
		{ headers, ...options }: Omit<RequestInit, 'method'> = {},
	): Promise<Serialized<OperationResult<'PUT', TPathPattern>>> {
        /* Implementation Hidden */
    }

	delete<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathWithParamsFor<'DELETE'> = PathWithParamsFor<'DELETE'>>(
		endpoint: TPath,
		params: ParamsFor<'DELETE', TPathPattern>,
		options?: Omit<RequestInit, 'method'>,
	): Promise<Serialized<OperationResult<'DELETE', TPathPattern>>>;

	delete<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathWithoutParamsFor<'DELETE'> = PathWithoutParamsFor<'DELETE'>>(
		endpoint: TPath,
		params?: undefined,
		options?: Omit<RequestInit, 'method'>,
	): Promise<Serialized<OperationResult<'DELETE', TPathPattern>>>;

	async delete<TPathPattern extends MatchPathPattern<TPath>, TPath extends PathFor<'DELETE'>>(
		endpoint: TPath,
		_params?: ParamsFor<'DELETE', TPathPattern>,
		options: Omit<RequestInit, 'method'> = {},
	): Promise<Serialized<OperationResult<'DELETE', TPathPattern>>> {
        /* Implementation Hidden */
    }

	protected getCredentialsAsHeaders(): Record<string, string> {
        /* Implementation Hidden */
    }

	send(endpoint: string, method: string, { headers, ...options }: Omit<RequestInit, 'method'> = {}): Promise<Response> {
        /* Implementation Hidden */
    }

	protected getParams(data: Record<string, object | number | string | boolean> | void): string {
        /* Implementation Hidden */
    }

	upload: RestClientInterface['upload'] = (endpoint, params, events, options = {}) => {
		if (!params) {
			throw new Error('Missing params');
		}
		const xhr = new XMLHttpRequest();
		const data = new FormData();

		Object.entries(params as any).forEach(([key, value]) => {
			if (value instanceof File) {
				data.append(key, value, value.name);
				return;
			}
			value && data.append(key, value as any);
		});

		xhr.open('POST', `${this.baseUrl}${`/${endpoint}`.replace(/\/+/, '/')}`, true);
		Object.entries({ ...this.getCredentialsAsHeaders(), ...options.headers }).forEach(([key, value]) => {
			xhr.setRequestHeader(key, value);
		});

		if (events?.load) {
			xhr.upload.addEventListener('load', events.load);
		}
		if (events?.progress) {
			xhr.upload.addEventListener('progress', events.progress);
		}
		if (events?.error) {
			xhr.addEventListener('error', events.error);
		}
		if (events?.abort) {
			xhr.addEventListener('abort', events.abort);
		}

		xhr.send(data);

		return xhr;
	};

	use(middleware: Middleware<RestClientInterface['send']>): void {
        /* Implementation Hidden */
    }

	handleTwoFactorChallenge(
		cb: (args: { method: 'totp' | 'email' | 'password'; emailOrUsername?: string; invalidAttempt?: boolean }) => Promise<string>,
	): void {
        /* Implementation Hidden */
    }
}

```